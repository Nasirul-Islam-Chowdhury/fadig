import { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

// client-side Links (incl. cross-page hashes) — ScrollManager scrolls to the target
const NAV_LINKS = [
  { label: "Features", to: "/#features" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Impact", to: "/#impact" },
  { label: "Our Story", to: "/about" },
  { label: "Roadmap", to: "/about#roadmap" },
  { label: "Pricing", to: "/pricing" },
  { label: "Team", to: "/#team" },
  { label: "Dashboard", to: "/dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-fadig-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto sm:h-12" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-fadig-cream/80 transition hover:text-fadig-green-light"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="group inline-flex items-center gap-1.5 rounded-full bg-fadig-green px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fadig-green/20 transition hover:bg-fadig-green-light">
                Sign Up
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button
            className="text-fadig-cream"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-fadig-bg px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-fadig-cream/80"
              >
                {link.label}
              </Link>
            ))}
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-fadig-green px-5 py-3 text-sm font-semibold text-white">
                  Sign Up
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
