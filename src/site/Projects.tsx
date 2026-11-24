import { ArrowUpRight, GitBranch } from "lucide-react";
import { githubStats, projects } from "../data";
import { ArtTile, Reveal } from "./ui";

const tones = ["lavender", "mint", "blue", "peach", "cream", "pink"];

export default function Projects() {
  return (
    <section id="projects" className="px-5 pb-24 pt-6 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="eyebrow">Selected work</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-[42px] leading-none">Projects</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[250px] text-[12.5px] leading-relaxed text-[#6d6a62]">
              Six builds, each deployed. Every card opens the live demo where one exists — and the
              code where it doesn't.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="https://github.com/ather-ops"
              target="_blank"
              rel="noreferrer"
              className="btn-dark mt-6"
            >
              <GitBranch size={14} /> Open GitHub
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[10.5px] text-[#9a958a]">
              {githubStats.repositories} public repositories · {githubStats.stars} stars
            </p>
          </Reveal>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:col-span-9">
          {projects.map((project, index) => {
            const live = project.status === "Live" && project.live;
            const href = live ? project.live : project.href;
            return (
              <Reveal key={project.id} delay={(index % 2) * 0.05}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="surface group flex h-full flex-col p-2.5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,26,40,0.08)]"
                >
                  <ArtTile tone={tones[index % tones.length]} className="h-36 rounded-[20px] sm:h-40">
                    <div className="flex h-full items-center justify-between p-5">
                      <span className="display text-[64px] leading-none text-[#20201c]/25">
                        {project.name.charAt(0)}
                      </span>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/30 text-white backdrop-blur transition group-hover:bg-white/50">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                    <span className="absolute bottom-3 left-4 rounded-full bg-white/25 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                      {project.kind}
                    </span>
                  </ArtTile>

                  <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="display text-[24px] leading-none">{project.name}</h3>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] ${
                          project.status === "Live"
                            ? "bg-[#eaf6ec] text-[#2d7a4a]"
                            : "bg-[#fdf1e3] text-[#a5672c]"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-[#6d6a62]">
                      {project.blurb}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.stack.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-[#eee9df] px-2 py-0.5 text-[8.5px] text-[#7a766d]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10.5px] font-semibold text-ink">
                      {live ? "Open demo" : "View code"} <ArrowUpRight size={11} />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
