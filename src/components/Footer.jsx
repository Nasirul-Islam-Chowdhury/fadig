import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between lg:px-10">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Logo className="h-10 w-auto" />
          <p className="max-w-xs text-center text-xs text-fadig-cream/40 sm:text-left">
            Predicting brown planthopper outbreaks with satellite & climate
            analytics — so farmers act early.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-fadig-cream/50">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#impact" className="hover:text-white">Impact</a>
          <a href="#team" className="hover:text-white">Team</a>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
        </div>

        <p className="text-xs text-fadig-cream/30">
          © {new Date().getFullYear()} FaDig · Team Minus One
        </p>
      </div>
    </footer>
  );
}
