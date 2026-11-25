import { Reveal } from "./ui";

const logos = [
  { label: "Xpect AI", href: "https://x-ai-test.streamlit.app", className: "font-semibold tracking-[-0.05em]" },
  { label: "AMAZN", href: "https://amazn-agentic-ai.streamlit.app", className: "aw-logo-serif" },
  { label: "PayPal", href: "https://paypal-copilot-agenta.streamlit.app", className: "font-bold tracking-[-0.045em]" },
  { label: "PulseMesh", href: "https://pulsh-mesh.streamlit.app", className: "aw-logo-serif-italic" },
  { label: "HOSPITAL SQL", href: "https://hospital-management--agent.streamlit.app", className: "aw-logo-wide" },
  { label: "Atlas Agent", paused: true },
  { label: "atherva", href: "https://atherva-automations.vercel.app", className: "font-semibold tracking-[-0.05em]" },
];

export default function LogoStrip() {
  return (
    <section id="live" className="aw-logos">
      <div className="aw-container">
        <Reveal>
          <p className="aw-logos-label">Nine deployments, from semantic search to agentic tools.</p>
          <div className="aw-logo-row">
            {logos.map((logo) => {
              const content = (
                <>
                  {logo.label}
                  {logo.paused && <sup className="aw-logo-paused">paused</sup>}
                </>
              );
              return logo.href ? (
                <a
                  key={logo.label}
                  href={logo.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`aw-logo-item ${logo.className || ""}`}
                >
                  {content}
                </a>
              ) : (
                <span key={logo.label} className={`aw-logo-item ${logo.className || ""}`}>
                  {content}
                </span>
              );
            })}
          </div>
          <p className="aw-logo-caption">Eight live systems. Every link goes somewhere.</p>
        </Reveal>
      </div>
    </section>
  );
}
