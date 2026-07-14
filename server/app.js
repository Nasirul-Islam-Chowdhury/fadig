import express from "express";
import Stripe from "stripe";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { getDb } from "./db.js";

// lazy init — a missing key then errors per-request as JSON instead of
// crashing the whole serverless function at import time
let stripeClient;
function stripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set — add it in Vercel → Settings → Environment Variables and redeploy",
    );
  }
  stripeClient ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return stripeClient;
}

// prices live server-side only — never trust amounts from the client
const PLANS = {
  monthly: { amount: 499, interval: "month", label: "FaDig Pro — Monthly" },
  yearly: { amount: 4900, interval: "year", label: "FaDig Pro — Yearly" },
};

const app = express();
app.use(clerkMiddleware());

// JSON 401 instead of requireAuth()'s redirect — this is an API, not a page
function requireUser(req, res, next) {
  const { userId } = getAuth(req);
  if (!userId) {
    // distinguish "no token sent" from "token sent but rejected" — the
    // latter almost always means CLERK_SECRET_KEY belongs to a different
    // Clerk application than the frontend's publishable key
    const hasToken = !!req.headers.authorization;
    return res.status(401).json({
      error: hasToken
        ? "Session token rejected — check that CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY are from the SAME Clerk app as VITE_CLERK_PUBLISHABLE_KEY"
        : "Not signed in",
    });
  }
  req.userId = userId;
  next();
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// plan + session_id travel as query strings — avoids Vercel's pre-parsed
// body clashing with express.json()
app.post("/api/checkout", requireUser, async (req, res) => {
  try {
    const plan = PLANS[req.query.plan];
    if (!plan) return res.status(400).json({ error: "Unknown plan" });

    const origin = req.headers.origin || `https://${req.headers.host}`;
    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: { name: plan.label },
            unit_amount: plan.amount,
            recurring: { interval: plan.interval },
          },
        },
      ],
      metadata: { clerkUserId: req.userId, plan: req.query.plan },
      success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("checkout error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/checkout/verify", requireUser, async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    if (!sessionId) return res.status(400).json({ error: "Missing session_id" });

    const session = await stripe().checkout.sessions.retrieve(sessionId);
    const paid =
      session.status === "complete" &&
      session.payment_status === "paid" &&
      session.metadata?.clerkUserId === req.userId;
    if (!paid) return res.status(402).json({ error: "Payment not completed" });

    const plan = session.metadata.plan;
    // computed locally (no webhooks) — good enough for demo-grade renewal
    const days = plan === "monthly" ? 32 : 366;
    const db = await getDb();
    await db.collection("subscriptions").updateOne(
      { clerkUserId: req.userId },
      {
        $set: {
          plan,
          status: "active",
          stripeSessionId: session.id,
          stripeSubscriptionId: session.subscription,
          currentPeriodEnd: new Date(Date.now() + days * 864e5),
        },
        $setOnInsert: { clerkUserId: req.userId, createdAt: new Date() },
      },
      { upsert: true },
    );

    res.json({ active: true, plan });
  } catch (err) {
    console.error("verify error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/subscription", requireUser, async (req, res) => {
  try {
    const db = await getDb();
    const sub = await db
      .collection("subscriptions")
      .findOne({ clerkUserId: req.userId });
    const active =
      !!sub && sub.status === "active" && sub.currentPeriodEnd > new Date();
    res.json({ active, plan: active ? sub.plan : null });
  } catch (err) {
    console.error("subscription error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default app;
