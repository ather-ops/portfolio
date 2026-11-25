import { motion } from "framer-motion";
import { AwButton } from "./ui";
import Header from "./Header";
import LogoStrip from "./LogoStrip";
import { profile } from "../data";

const proof = [
  { src: "/img/projects/icon-xpect.webp", alt: "Xpect AI", bg: "#efe5ff" },
  { src: "/img/projects/icon-paypal.webp", alt: "PayPal Copilot", bg: "#e3efff" },
  { src: "/img/projects/icon-pulsemesh.webp", alt: "PulseMesh", bg: "#e7f7e1" },
];

export default function Hero() {
  return (
    <section id="home" className="aw-hero">
      <Header />

      <div className="aw-container aw-hero-body">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
          className="aw-availability"
        >
          <span className="aw-availability-dot" />
          <strong>Open to AI/ML engineer roles</strong>
          <span className="aw-availability-sep" />
          Remote / Srinagar
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="aw-hero-title"
        >
          <span className="aw-line">Building AI systems</span>{" "}
          <span className="aw-line">
            with <em className="aw-italic">thoughtful design</em>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="aw-hero-sub"
        >
          ML/AI engineer and founder of Atherva Automations. I build production RAG, multi-agent
          tools and applied ML — with 10+ public demos and a full case study for every build.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="aw-hero-actions"
        >
          <AwButton href="#work" variant="purple">
            Explore the work
          </AwButton>

          <AwButton href={profile.resume} variant="light" external>
            Download résumé
          </AwButton>

          <div className="aw-hero-proof">
            <div className="aw-avatar-stack" aria-hidden="true">
              {proof.map((item) => (
                <span key={item.alt} className="aw-avatar" style={{ background: item.bg }}>
                  <img src={item.src} alt="" loading="eager" />
                </span>
              ))}
            </div>
            <div className="aw-proof-text">
              <strong>10+ public demos</strong>
              <span>1,000+ contributions · 15 case studies</span>
            </div>
          </div>
        </motion.div>
      </div>

      <LogoStrip />
    </section>
  );
}
