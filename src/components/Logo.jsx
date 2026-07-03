import logo from "../assets/fadig-logo.png";

export default function Logo({ className = "h-9 w-auto" }) {
  return <img src={logo} alt="FaDig" className={className} draggable="false" />;
}
