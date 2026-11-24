import Header from "./site/Header";
import Hero from "./site/Hero";
import { StartHere, Stats, Why } from "./site/Start";
import Process from "./site/Process";
import Services from "./site/Services";
import Systems from "./site/Systems";
import Features from "./site/Features";
import Projects from "./site/Projects";
import Live from "./site/Live";
import Startup from "./site/Startup";
import Plans from "./site/Plans";
import Hiring from "./site/Hiring";
import Faq from "./site/Faq";
import Journal from "./site/Journal";
import Cta from "./site/Cta";
import Footer from "./site/Footer";
import Uri from "./components/Uri";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-ink">
      <Header />
      <main>
        <Hero />
        <StartHere />
        <Why />
        <Stats />
        <Process />
        <Services />
        <Systems />
        <Features />
        <Projects />
        <Live />
        <Startup />
        <Plans />
        <Hiring />
        <Faq />
        <Journal />
        <Cta />
      </main>
      <Footer />
      <Uri />
    </div>
  );
}
