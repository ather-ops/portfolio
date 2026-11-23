import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Expertise from "./components/Expertise";
import RecruiterPortal from "./components/RecruiterPortal";
import Projects from "./components/Projects";
import LiveApps from "./components/LiveApps";
import Startup from "./components/Startup";
import Collaborate from "./components/Collaborate";
import Recognition from "./components/Recognition";
import Insights from "./components/Insights";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Uri from "./components/Uri";

export default function App() {
  return (
    <div className="min-h-screen text-ink">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Expertise />
        <RecruiterPortal />
        <Projects />
        <LiveApps />
        <Startup />
        <Collaborate />
        <Recognition />
        <Insights />
        <CTA />
      </main>
      <Footer />
      <Uri />
    </div>
  );
}
