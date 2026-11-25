import { Reveal, StarMark } from "./ui";

const apps = [
  { name: "Xpect AI", href: "https://x-ai-test.streamlit.app/", cls: "tj-logo-serif italic" },
  { name: "AMAZN AI", href: "https://amazn-agentic-ai.streamlit.app/", cls: "tj-logo-mark tracking-[0.16em] text-[17px]" },
  { name: "PayPal Copilot", href: "https://paypal-copilot-agenta.streamlit.app/", cls: "tj-logo-serif" },
  { name: "PulseMesh", href: "https://pulsh-mesh.streamlit.app/", cls: "tj-logo-mark" },
  { name: "Hospital SQL", href: "https://hospital-management--agent.streamlit.app/", cls: "tj-logo-serif" },
  { name: "Atlas Agent", href: "https://github.com/ather-ops/atlas-agent", cls: "tj-logo-mark text-[18px]", note: "paused" },
];

export default function LogoStrip() {
  return (
    <section id="live" className="px-5 pb-5 pt-14 sm:px-8 sm:pt-20">
      <Reveal>
        <h2 className="tj-display text-center text-[28px] leading-none text-[var(--tj-navy)] sm:text-[32px]">
          Already in motion.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mx-auto mt-9 flex max-w-[1040px] flex-wrap items-center justify-center gap-x-9 gap-y-5 sm:gap-x-12">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noreferrer"
              className={`${app.cls} inline-flex items-baseline gap-1.5 transition-opacity hover:opacity-100`}
            >
              {app.name}
              {app.note && (
                <span className="tj-label text-[8px] tracking-[0.14em] text-[rgba(38,50,66,0.38)]">
                  {app.note}
                </span>
              )}
            </a>
          ))}
          <a
            href="https://atherva-automations.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="tj-logo-mark inline-flex items-center gap-1.5 text-[18px] text-[rgba(38,50,66,0.62)] hover:text-[var(--tj-navy)]"
          >
            <StarMark size={14} className="text-[var(--tj-peach-strong)]" />
            atherva
          </a>
        </div>
      </Reveal>
      <Reveal delay={0.14}>
        <p className="mt-7 text-center text-[10px] uppercase tracking-[0.16em] text-[rgba(38,50,66,0.38)] tj-ui">
          Nine deployments · seven public demos · one paused
        </p>
      </Reveal>
    </section>
  );
}
