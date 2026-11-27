import { StarMark, Kicker, Reveal } from "./ui";

/* A shelf of spines: five capabilities as books, a numeral card for the case
   studies, and one tilted volume as the signature. White slabs on electric
   blue, type rotated up the spine, publisher mark at the foot of each. */
type Book = {
  title: string;
  sub: string;
  w: number;
  h: number;
  mark?: boolean;
  tilt?: number;
};

const books: Book[] = [
  {
    title: "RAG & SEARCH",
    sub: "Retrieval · FAISS · citations",
    w: 78,
    h: 336,
  },
  {
    title: "AGENTIC AI",
    sub: "Tools · routing · guardrails",
    w: 96,
    h: 384,
    mark: true,
  },
  {
    title: "APPLIED ML",
    sub: "NumPy · Torch · sklearn",
    w: 70,
    h: 312,
  },
  {
    title: "DATA INTELLIGENCE",
    sub: "SQL · analytics",
    w: 86,
    h: 356,
    mark: true,
  },
  {
    title: "AUTOMATION",
    sub: "Workflows · ops",
    w: 72,
    h: 320,
  },
];

export default function Services() {
  return (
    <section id="services" className="aw-services">
      <div className="aw-container">
        <Reveal>
          <div className="aw-shelf-head">
            <Kicker>Capabilities</Kicker>
            <h2 className="aw-h2">
              Where engineering
              <br />
              meets <em className="aw-italic">craft.</em>
            </h2>
            <p className="aw-shelf-sub">
              Five things I do end to end — shelved like the references they came from: retrieval,
              agents, applied ML, the data underneath them and the automation on top.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="aw-container">
        <Reveal delay={0.06}>
          <div className="aw-shelf">
            <ul className="aw-books">
              {books.map((book) => (
                <li key={book.title} className="aw-book" style={{ ["--w" as string]: `${book.w}px`, ["--h" as string]: `${book.h}px` }}>
                  <Spine book={book} />
                </li>
              ))}

              <li className="aw-book aw-book--numeral" style={{ ["--w" as string]: "152px", ["--h" as string]: "318px" }}>
                <span className="aw-book-note">Palette / work</span>
                <strong className="aw-book-figure">15</strong>
                <span className="aw-book-pub">case studies</span>
              </li>

              <li
                className="aw-book aw-book--tilt"
                style={{ ["--w" as string]: "86px", ["--h" as string]: "372px", ["--tilt" as string]: "10deg" }}
              >
                <span className="aw-book-lines">
                  <span className="aw-book-title aw-book-title--lg">Good by design</span>
                </span>
                <span className="aw-book-pub">ather. studio</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="aw-container">
        <Reveal delay={0.12}>
          <p className="aw-stack-line">Python · FAISS · FastAPI · Groq · Streamlit · Vercel</p>
        </Reveal>
      </div>
    </section>
  );
}

function Spine({ book }: { book: Book }) {
  return (
    <>
      <span className="aw-book-lines">
        <span className="aw-book-title">{book.title}</span>
        <span className="aw-book-sub">{book.sub}</span>
      </span>
      {book.mark && (
        <span className="aw-book-star" aria-hidden="true">
          <StarMark size={13} />
        </span>
      )}
      <span className="aw-book-pub">ather.</span>
    </>
  );
}
