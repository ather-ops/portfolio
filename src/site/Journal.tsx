import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./ui";

const notes = [
  {
    tag: "RAG",
    title: "Turning 8,807 titles into semantic neighbours",
    copy: "Why Xpect AI moved from ChromaDB and NLTK to FAISS, and what 384 dimensions actually buy a search box.",
    href: "https://github.com/ather-ops/Xpect-AI",
    image: "/img/bloom.jpg",
    alt: "Pink iridescent flower on a blue sky",
  },
  {
    tag: "ML",
    title: "Every gradient derived before the library call",
    copy: "Ridge and Lasso written in NumPy, then checked against scikit-learn to MSE 0.4598 and R² 0.9767.",
    href: "https://github.com/ather-ops/Supervised-ML-from-scratch",
    image: "/img/orange-bloom.jpg",
    alt: "Orange poppy flower on a cream background",
  },
];

export default function Journal() {
  return (
    <section id="insights" className="px-5 pb-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHead
            align="left"
            eyebrow="Notes"
            title="From the build log"
            sub="No newsletter — just the repositories and the reasoning behind them."
            className="max-w-lg"
          />
          <Reveal delay={0.1}>
            <a
              href="https://github.com/ather-ops"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              View all <ArrowUpRight size={13} />
            </a>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {notes.map((note, index) => (
            <Reveal key={note.title} delay={index * 0.06}>
              <a
                href={note.href}
                target="_blank"
                rel="noreferrer"
                className="surface group block h-full p-2.5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,26,40,0.08)]"
              >
                <div className="h-48 overflow-hidden rounded-[20px] sm:h-56">
                  <img
                    src={note.image}
                    alt={note.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="px-3 pb-4 pt-4">
                  <span className="pill">{note.tag}</span>
                  <h3 className="display mt-3 max-w-[300px] text-[26px] leading-[1.05] sm:text-[28px]">
                    {note.title}
                  </h3>
                  <p className="mt-2 max-w-[330px] text-[11px] leading-relaxed text-[#6d6a62]">
                    {note.copy}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[10.5px] font-semibold text-ink">
                    Read the repository <ArrowUpRight size={11} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
