import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemSection from "../components/ProblemSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Impact from "../components/Impact";
import Team from "../components/Team";
import SkyDrop from "../components/skydrop/SkyDrop";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-fadig-bg text-fadig-cream">
      <Navbar />
      <Hero />
      <ProblemSection />
      <Features />
      <HowItWorks />
      <Impact />
      <Team />
      <SkyDrop />
      <CTASection />
      <Footer />
    </div>
  );
}
