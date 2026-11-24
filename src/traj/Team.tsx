import { ArrowUpRight } from "lucide-react";
import { Label, Reveal } from "./ui";

export default function Team() {
  return (
    <section id="team" className="px-5 pt-14 sm:px-8 sm:pt-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="grid gap-12 border-t border-[rgba(248,249,233,0.16)] pt-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <Label light>Independent by design</Label>
              <h2 className="tj-display mt-4 max-w-[380px] text-[38px] leading-[1.02] text-[var(--tj-cream)] sm:text-[44px]">
                One builder. Nine systems.
              </h2>
              <p className="tj-serif mt-4 max-w-[360px] text-[17px] leading-[1.3] text-[rgba(248,249,233,0.66)]">
                Ather Sama builds end to end: the retrieval, the interface, the deployment and the
                documentation. Independent for two years, based in Srinagar.
              </p>
              <a href="#contact" className="tj-btn tj-btn--peach tj-btn--sm mt-7">
                Work with Ather <ArrowUpRight size={12} />
              </a>
            </div>

            <div className="lg:col-span-7 lg:pl-10">
              <div className="flex items-start justify-between gap-6">
                <p className="tj-label tj-label--light">Deployments since 2023</p>
                <p className="tj-label tj-label--light">All public</p>
              </div>
              <div className="flex items-start gap-2 border-t border-[rgba(248,249,233,0.16)] pt-4">
                <span className="tj-metric tj-metric--band mt-1">09</span>
                <span className="mt-3 tj-display text-[26px] leading-none text-[rgba(248,249,233,0.75)]">
                  systems
                </span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-3 border-t border-[rgba(248,249,233,0.16)] pt-4">
                <div>
                  <p className="tj-display text-[21px] text-[var(--tj-cream)]">08</p>
                  <p className="tj-label tj-label--light mt-1">Live</p>
                </div>
                <div>
                  <p className="tj-display text-[21px] text-[var(--tj-cream)]">07</p>
                  <p className="tj-label tj-label--light mt-1">Public demos</p>
                </div>
                <div>
                  <p className="tj-display text-[21px] text-[var(--tj-cream)]">01</p>
                  <p className="tj-label tj-label--light mt-1">Paused</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
