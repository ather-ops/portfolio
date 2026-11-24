import { Mail, Sparkles } from "lucide-react";
import { profile } from "../data";
import { openUri, Reveal } from "./ui";

export default function Cta() {
  return (
    <section id="cta" className="relative overflow-hidden px-5 pb-24 pt-8 sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[420px] max-w-4xl -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, #dfe3ff 0%, #f6e4ff 45%, #ffe9df 72%, transparent 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-2xl py-16 text-center">
        <Reveal>
          <span className="eyebrow">Open to work</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mt-5 text-[46px] leading-[0.95] sm:text-[64px]">
            Ready to build{" "}
            <br />
            something real?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-sm text-[12.5px] leading-relaxed text-[#6d6a62]">
            Open to AI/ML internships and remote roles, available immediately — or bring Atherva a
            workflow worth automating.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <a href={`mailto:${profile.email}`} className="btn-dark">
              <Mail size={14} /> Email Ather
            </a>
            <button type="button" onClick={openUri} className="uri-trigger btn-outline">
              <Sparkles size={13} /> Ask URI
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 text-[10px] text-[#9a958a]">
            {profile.email} · {profile.phone} · {profile.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
