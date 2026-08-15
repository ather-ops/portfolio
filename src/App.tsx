import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Expertise from "./components/Expertise";
import RecruiterPortal from "./components/RecruiterPortal";
import Projects from "./components/Projects";
import Collaborate from "./components/Collaborate";
import Recognition from "./components/Recognition";
import Insights from "./components/Insights";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((v) => !v);

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-ink dark:bg-[#0a0a0c] dark:text-[#f8fafc] transition-colors duration-300">
      <Navbar isDark={isDark} toggleDark={toggleDark} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Expertise />
        
        {/* Recruiter & HR Immediate Interactive Actions */}
        <RecruiterPortal />

        <Projects />
        <Collaborate />
        <Recognition />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
