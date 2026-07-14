import Navbar from "../components/Navbar";
import StoryHero from "../components/about/StoryHero";
import Story from "../components/about/Story";
import MissionVision from "../components/about/MissionVision";
import Milestones from "../components/about/Milestones";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-fadig-bg text-fadig-cream">
      <Navbar />
      <StoryHero />
      <Story />
      <MissionVision />
      <Milestones />
      <CTASection />
      <Footer />
    </div>
  );
}
