import { motion } from "framer-motion";
import { AwButton } from "./ui";
import Header from "./Header";
import LogoStrip from "./LogoStrip";

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
          Ather Sama builds production RAG, multi-agent tools and applied ML — then keeps the
          systems running in public.
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

          <div className="aw-hero-proof">
            <div className="aw-avatar-stack" aria-hidden="true">
              {proof.map((item) => (
                <span key={item.alt} className="aw-avatar" style={{ background: item.bg }}>
                  <img src={item.src} alt="" loading="eager" />
                </span>
              ))}
            </div>
            <div className="aw-proof-text">
              <strong>9 deployments</strong>
              <span>8 live systems · 7 public demos</span>
            </div>
          </div>
        </motion.div>
      </div>

      <LogoStrip />
    </section>
  );
}
