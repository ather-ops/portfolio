import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "../data";
import { Label, Reveal, StarMark } from "./ui";

export default function Cta() {
  return (
    <section id="contact" className="px-5 pb-14 sm:px-8 sm:pb-20">
      <Reveal>
        <div className="tj-cta-panel relative mx-auto max-w-[1280px] overflow-hidden px-5 py-16 text-center sm:px-10 sm:py-20">
          <StarMark size={18} className="mx-auto text-[rgba(38,50,66,0.35)]" />
          <div className="mt-6">
            <Label>Start here</Label>
          </div>
          <h2 className="tj-display mx-auto mt-4 max-w-[900px] text-[46px] leading-[0.94] sm:text-[72px] lg:text-[84px]">
            Build something that stays up.
          </h2>
          <p className="tj-serif mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.3] text-[rgba(31,42,56,0.68)] sm:text-[19px]">
            Tell me what you are trying to ship — a retrieval system, an agent, or a first ML
            model. You will get a straight answer about scope, fit and timeline.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <a
              href={`mailto:${profile.email}?subject=Let%27s%20build%20something`}
              className="tj-btn tj-btn--navy w-full sm:w-auto"
            >
              <Mail size={13} /> Start a conversation
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="tj-btn tj-btn--peach w-full sm:w-auto"
            >
              Message on WhatsApp <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href={profile.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="tj-label text-[9px] underline decoration-[rgba(38,50,66,0.28)] underline-offset-4 transition hover:text-[var(--tj-navy)]"
            >
              Atherva project · free trial
            </a>
            <a
              href={`mailto:${profile.email}?subject=AI%2FML%20internship`}
              className="tj-label text-[9px] underline decoration-[rgba(38,50,66,0.28)] underline-offset-4 transition hover:text-[var(--tj-navy)]"
            >
              AI/ML internship
            </a>
            <a
              href={`mailto:${profile.email}?subject=Freelance%20build`}
              className="tj-label text-[9px] underline decoration-[rgba(38,50,66,0.28)] underline-offset-4 transition hover:text-[var(--tj-navy)]"
            >
              Freelance build
            </a>
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-2 border-t border-[rgba(38,50,66,0.14)] pt-5 sm:flex-row sm:gap-6">
            <span className="tj-pill tj-pill--mint">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5c8a6f]" />
              {profile.availability}
            </span>
            <p className="tj-label text-[9px] text-[rgba(38,50,66,0.55)]">
              Srinagar, India · remote-first
            </p>
            <a
              href={profile.resume}
              className="tj-label text-[9px] underline decoration-[rgba(38,50,66,0.3)] underline-offset-4 hover:text-[var(--tj-navy)]"
            >
              Résumé
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
