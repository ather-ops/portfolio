import { ArrowUpRight, GitBranch } from "lucide-react";
import { githubStats, projects } from "../data";
import { ArtTile, Reveal } from "./ui";

const tones = ["lavender", "mint", "blue", "peach", "cream", "pink"];

/** Real cover art pulled from each project's own repository. */
const covers: Record<string, { src: string; alt: string }> = {
  "01": {
    src: "/img/projects/paypal.jpg",
    alt: "PayPal Copilot cover with the headline Introducing PayPal Copilot on a peach and lilac gradient",
  },
  "02": {
    src: "/img/projects/amazn.jpg",
    alt: "Amazn AI cover with a green glow and the headline Meet Amazn AI",
  },
  "03": {
    src: "/img/projects/xpect.jpg",
    alt: "Xpect AI cover with its black wordmark on a graph-paper background",
  },
  "04": {
    src: "/img/projects/pulsemesh.jpg",
    alt: "PulseMesh cover reading Less noise, more knowing above a purple colour grid",
  },
  "05": {
    src: "/img/projects/atlas.jpg",
    alt: "Atlas Agent cover with a white wordmark on a black grid",
  },
  "06": {
    src: "/img/projects/hospital.jpg",
    alt: "Hospital Management cover with blue 3D petals and gradient typography",
  },
};

/** A few cards get a matching 3D glass mark from the same render family. */
const icons: Record<string, string> = {
  "01": "/img/projects/icon-paypal.webp",
  "03": "/img/projects/icon-xpect.webp",
  "04": "/img/projects/icon-pulsemesh.webp",
};

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
                  className="surface edge-lit group flex h-full flex-col p-2.5 transition duration-300 hover:-translate-y-1"
                >
                  <ArtTile tone={tones[index % tones.length]} className="h-36 rounded-[20px] sm:h-40">
                    <img
                      src={covers[project.id].src}
                      alt={covers[project.id].alt}
                      className="project-cover absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-white/10" />
                    <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition group-hover:bg-black/35">
                      <ArrowUpRight size={14} />
                    </span>
                    <span className="absolute bottom-3 left-4 rounded-full border border-white/25 bg-black/25 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                      {project.kind}
                    </span>
                    {icons[project.id] && (
                      <span className="absolute bottom-3 right-3 grid h-14 w-14 place-items-center rounded-[18px] border border-white/40 bg-white/15 shadow-[0_10px_24px_rgba(4,18,60,0.28)] backdrop-blur-md">
                        <img
                          src={icons[project.id]}
                          alt=""
                          aria-hidden="true"
                          className="h-11 w-11 object-contain drop-shadow-[0_6px_10px_rgba(0,25,90,0.35)]"
                          loading="lazy"
                        />
                      </span>
                    )}
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
