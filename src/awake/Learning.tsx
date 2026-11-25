import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Kicker, Reveal } from "./ui";

type Card = {
  title: string;
  body: string;
  provider: string;
  meta: string;
  progress: number;
  tone: "lav" | "blue" | "peach" | "green" | "violet";
  word: string;
  index: string;
};

const completed: Card[] = [
  {
    title: "Hugging Face AI Agents course",
    body: "Every unit, built end to end: CodeAgents, tool routing, retries, evaluation and a graded final agent.",
    provider: "Hugging Face",
    meta: "All units · certified path",
    progress: 100,
    tone: "lav",
    word: "agents",
    index: "01",
  },
  {
    title: "FastAPI",
    body: "Pydantic validation, dependency injection, async endpoints and deploying a REST service people can call.",
    provider: "FastAPI",
    meta: "APIs, validation, deployment",
    progress: 100,
    tone: "blue",
    word: "serve",
    index: "02",
  },
  {
    title: "Docker",
    body: "Images, containers and compose — reproducible builds so a demo runs the same on my machine and yours.",
    provider: "Docker",
    meta: "Images, containers, compose",
    progress: 100,
    tone: "green",
    word: "ship",
    index: "03",
  },
  {
    title: "Python fundamentals + core libraries",
    body: "Core syntax, OOP and testing, then NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn and Streamlit.",
    provider: "Python",
    meta: "Core + data stack",
    progress: 100,
    tone: "peach",
    word: "python",
    index: "04",
  },
];

const learning: Card[] = [
  {
    title: "Building LLMs from scratch",
    body: "Architecture, tokenisation and training loops — attention and gradient descent rebuilt by hand first.",
    provider: "LLM track",
    meta: "Architecture · tokenisation · training",
    progress: 45,
    tone: "violet",
    word: "llm",
    index: "05",
  },
  {
    title: "PyTorch for deep learning",
    body: "Tensors, autograd and training loops — moving the NumPy implementations onto real GPU tooling.",
    provider: "PyTorch",
    meta: "Tensors · autograd · training",
    progress: 55,
    tone: "peach",
    word: "torch",
    index: "06",
  },
  {
    title: "AWS — EC2, S3 and Lambda",
    body: "Deploying models and services beyond Streamlit: compute, object storage and serverless endpoints.",
    provider: "AWS",
    meta: "EC2 · S3 · Lambda",
    progress: 40,
    tone: "blue",
    word: "cloud",
    index: "07",
  },
  {
    title: "Google ML Crash Course",
    body: "Embeddings, LLMs and RAG fundamentals — sharpening the retrieval side of the agent work.",
    provider: "Google",
    meta: "Embeddings · LLMs · RAG",
    progress: 60,
    tone: "green",
    word: "rag",
    index: "08",
  },
  {
    title: "LangGraph for stateful agent workflows",
    body: "Stateful graphs, checkpoints and human-in-the-loop gates — the next layer above single-shot agents.",
    provider: "LangGraph",
    meta: "Stateful agents · next up",
    progress: 30,
    tone: "lav",
    word: "graph",
    index: "09",
  },
];

const gauges = [
  {
    label: "Whole track",
    value: 44,
    caption: "4 of 9 courses",
    note: "Nine courses chosen for the work I ship, not a syllabus.",
    tone: "green",
  },
  {
    label: "LLM & agents",
    value: 58,
    caption: "1 done · 2 running",
    note: "Agents course complete; LLMs from scratch and LangGraph in flight.",
    tone: "violet",
  },
  {
    label: "Cloud & serving",
    value: 80,
    caption: "2 done · 1 running",
    note: "FastAPI and Docker done; AWS is the open end.",
    tone: "blue",
  },
] as const;

const RING = { size: 132, stroke: 15, r: 49 };
const CIRC = 2 * Math.PI * RING.r;

function Gauge({ value, caption, tone }: { value: number; caption: string; tone: string }) {
  const id = `aw-gauge-${tone}`;
  return (
    <div className={`aw-gauge aw-gauge--${tone}`}>
      <svg viewBox="0 0 132 132" className="aw-gauge-svg" role="img" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            {tone === "green" && (
              <>
                <stop offset="0%" stopColor="#8ff06a" />
                <stop offset="55%" stopColor="#37c65f" />
                <stop offset="100%" stopColor="#1fa84c" />
              </>
            )}
            {tone === "violet" && (
              <>
                <stop offset="0%" stopColor="#b79bff" />
                <stop offset="55%" stopColor="#7c5cff" />
                <stop offset="100%" stopColor="#5433e6" />
              </>
            )}
            {tone === "blue" && (
              <>
                <stop offset="0%" stopColor="#8cc6ff" />
                <stop offset="55%" stopColor="#4f8ff5" />
                <stop offset="100%" stopColor="#2f6bff" />
              </>
            )}
          </linearGradient>
        </defs>

        <circle
          className="aw-gauge-dots"
          cx="66"
          cy="66"
          r={RING.r + 8}
          strokeDasharray="0.6 11"
          strokeLinecap="round"
        />
        <circle className="aw-gauge-track" cx="66" cy="66" r={RING.r} strokeWidth={RING.stroke} />
        <motion.circle
          className="aw-gauge-arc"
          cx="66"
          cy="66"
          r={RING.r}
          strokeWidth={RING.stroke}
          strokeLinecap="round"
          stroke={`url(#${id})`}
          strokeDasharray={CIRC}
          initial={{ strokeDashoffset: CIRC }}
          whileInView={{ strokeDashoffset: CIRC * (1 - value / 100) }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          transform="rotate(-90 66 66)"
        />
      </svg>

      <div className="aw-gauge-center">
        <span className="aw-gauge-value">
          {value}
          <i>%</i>
        </span>
        <span className="aw-gauge-caption">{caption}</span>
      </div>
    </div>
  );
}

const CARD_RING = { r: 26, stroke: 5 };
const CARD_CIRC = 2 * Math.PI * CARD_RING.r;

function CardRing({ value, tone, done }: { value: number; tone: Card["tone"]; done: boolean }) {
  return (
    <div className={`aw-lcard-ring aw-lcard-ring--${tone}`} aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <circle className="aw-lcard-ring-track" cx="32" cy="32" r={CARD_RING.r} strokeWidth={CARD_RING.stroke} />
        <motion.circle
          className="aw-lcard-ring-arc"
          cx="32"
          cy="32"
          r={CARD_RING.r}
          strokeWidth={CARD_RING.stroke}
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={CARD_CIRC}
          initial={{ strokeDashoffset: CARD_CIRC }}
          whileInView={{ strokeDashoffset: CARD_CIRC * (1 - value / 100) }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <span className="aw-lcard-ring-label">
        {done ? <Check size={15} strokeWidth={2.8} /> : <>{value}<i>%</i></>}
      </span>
    </div>
  );
}

function LearningCard({ card, wide = false }: { card: Card; wide?: boolean }) {
  const done = card.progress >= 100;

  return (
    <article
      className={`aw-lcard aw-lcard--${card.tone}${done ? " is-done" : ""}${
        wide ? " aw-lcard--wide" : ""
      }`}
    >
      <span className="aw-lcard-glow" aria-hidden="true" />
      <span className="aw-lcard-word" aria-hidden="true">
        {card.word}
      </span>

      <div className="aw-lcard-top">
        <span className="aw-lcard-index">{card.index}</span>
        <span className="aw-lcard-state">{done ? "Completed" : "In progress"}</span>
      </div>

      <div className="aw-lcard-main">
        <div className="aw-lcard-text">
          <h4 className="aw-lcard-title">{card.title}</h4>
          <p className="aw-lcard-body">{card.body}</p>
        </div>
        <CardRing value={card.progress} tone={card.tone} done={done} />
      </div>

      <div className="aw-lcard-foot">
        <strong>{card.provider}</strong>
        <span>{card.meta}</span>
      </div>
    </article>
  );
}

function Group({
  label,
  count,
  items,
  wideLast = false,
}: {
  label: string;
  count: string;
  items: Card[];
  wideLast?: boolean;
}) {
  return (
    <div className="aw-learn-group">
      <div className="aw-learn-group-head">
        <p className="aw-learn-group-label">{label}</p>
        <span className="aw-learn-group-count">{count}</span>
      </div>
      <div className="aw-learn-grid">
        {items.map((card, i) => (
          <Reveal
            key={card.title}
            delay={Math.min(i * 0.05, 0.2)}
            className={wideLast && i === items.length - 1 ? "aw-learn-wide" : ""}
          >
            <LearningCard card={card} wide={wideLast && i === items.length - 1} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Learning() {
  return (
    <div className="aw-learn">
      <div className="aw-learn-head">
        <div>
          <Kicker>Currently learning</Kicker>
          <h3>
            From LLM APIs
            <br />
            to <em className="aw-italic">building my own.</em>
          </h3>
        </div>
        <span className="aw-learn-chip">
          <Sparkles size={11} /> LLM track
        </span>
      </div>

      <div className="aw-gauge-row">
        {gauges.map((gauge, i) => (
          <Reveal key={gauge.label} delay={i * 0.06} className="aw-gauge-card-wrap">
            <div className="aw-gauge-card">
              <p className="aw-gauge-label">{gauge.label}</p>
              <Gauge value={gauge.value} caption={gauge.caption} tone={gauge.tone} />
              <p className="aw-gauge-note">{gauge.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Group label="Completed" count="4 courses · all units" items={completed} />
      <Group label="In progress" count="5 running" items={learning} wideLast />
    </div>
  );
}
