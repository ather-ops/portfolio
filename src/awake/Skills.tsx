import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Kicker, Reveal } from "./ui";
import Learning from "./Learning";

const LANG_CIRC = 2 * Math.PI * 35;

const languages = [
  { name: "Python", level: 90, note: "Core, OOP, libraries, FastAPI", tone: "python" },
  { name: "SQL", level: 80, note: "Joins, aggregation, schema design", tone: "sql" },
  { name: "C", level: 50, note: "Fundamentals, memory, pointers", tone: "c" },
];

const groups = [
  {
    title: "Python foundations + libraries",
    body:
      "Core syntax, OOP, comprehensions, exceptions, file I/O, modules and pytest — with NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, Streamlit, FastAPI and Pydantic.",
    badge: "Done",
  },
  {
    title: "Data analysis",
    body:
      "EDA, missing-value handling, type repair, feature engineering, outlier treatment with IQR, grouping and multi-table joins, CSV and dashboard reporting.",
    badge: "Done",
  },
  {
    title: "Classical ML",
    body:
      "Linear and logistic regression, KNN, Naive Bayes, SVM, Ridge and Lasso, decision trees, random forests, gradient boosting and gradient descent — with NumPy implementations alongside scikit-learn pipelines.",
    badge: "Ongoing",
    tone: "progress",
  },
  {
    title: "RAG & LLMs",
    body:
      "FAISS, SentenceTransformers, ChromaDB, Groq and Gemini APIs, embeddings, top-k retrieval, grounded prompting, context restriction and semantic search.",
    badge: "Shipped",
  },
  {
    title: "Agentic AI",
    body:
      "smolagents CodeAgents, Groq function calling, ReAct loops, multi-tool routing, tool allow-lists, retries, timeouts and fallback agents. LangGraph is next.",
    badge: "Shipped",
  },
  {
    title: "Backend & shipping",
    body:
      "FastAPI, Uvicorn, asyncio + aiohttp, Pydantic, REST APIs and OAuth, Docker, pytest, Git/GitHub, Streamlit Cloud, Hugging Face Spaces, Render and Vercel.",
    badge: "Done",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="aw-skills">
      <div className="aw-container">
        <Reveal>
          <div className="aw-section-head">
            <Kicker>Skills & stack</Kicker>
            <h2 className="aw-h2">
              The toolkit,
              <br />
              <em className="aw-italic">and how deep it goes.</em>
            </h2>
            <p className="aw-lead">
              Built from the résumé, not a wishlist. Comfort levels are self-assessed; completed
              courses and shipped systems are labelled separately.
            </p>
          </div>
        </Reveal>

        <div className="aw-skills-grid">
          <Reveal className="aw-lang-panel">
            <div className="aw-lang-head">
              <p className="aw-kicker">Languages · comfort level</p>
              <span className="aw-lang-badge">Self-assessed</span>
            </div>
            <div className="aw-lang-list">
              {languages.map((lang, index) => (
                <div key={lang.name} className={`aw-lang-row aw-lang-row--${lang.tone}`}>
                  <div
                    className="aw-lang-gauge"
                    role="progressbar"
                    aria-label={`${lang.name} comfort level`}
                    aria-valuenow={lang.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <svg viewBox="0 0 96 96" aria-hidden="true">
                      <defs>
                        <linearGradient id={`aw-lang-grad-${lang.tone}`} x1="0" y1="0" x2="1" y2="1">
                          {lang.tone === "python" && (
                            <>
                              <stop offset="0%" stopColor="#2f6bff" />
                              <stop offset="55%" stopColor="#7c5cff" />
                              <stop offset="100%" stopColor="#b18cff" />
                            </>
                          )}
                          {lang.tone === "sql" && (
                            <>
                              <stop offset="0%" stopColor="#0f9e8a" />
                              <stop offset="55%" stopColor="#45c98b" />
                              <stop offset="100%" stopColor="#a4e66f" />
                            </>
                          )}
                          {lang.tone === "c" && (
                            <>
                              <stop offset="0%" stopColor="#ff8a3d" />
                              <stop offset="60%" stopColor="#ff6b6b" />
                              <stop offset="100%" stopColor="#ff9f9f" />
                            </>
                          )}
                        </linearGradient>
                      </defs>
                      <circle
                        className="aw-lang-gauge-dots"
                        cx="48"
                        cy="48"
                        r="42"
                        strokeDasharray="0.5 8.5"
                        strokeLinecap="round"
                      />
                      <circle className="aw-lang-gauge-track" cx="48" cy="48" r="35" strokeWidth="9" />
                      <motion.circle
                        className="aw-lang-gauge-arc"
                        cx="48"
                        cy="48"
                        r="35"
                        strokeWidth="9"
                        strokeLinecap="round"
                        stroke={`url(#aw-lang-grad-${lang.tone})`}
                        strokeDasharray={LANG_CIRC}
                        initial={{ strokeDashoffset: LANG_CIRC }}
                        whileInView={{ strokeDashoffset: LANG_CIRC * (1 - lang.level / 100) }}
                        viewport={{ once: true, margin: "-8% 0px" }}
                        transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        transform="rotate(-90 48 48)"
                      />
                    </svg>
                    <span className="aw-lang-gauge-value">
                      {lang.level}
                      <i>%</i>
                    </span>
                  </div>

                  <div className="aw-lang-copy">
                    <span className="aw-lang-name">{lang.name}</span>
                    <p className="aw-lang-note">{lang.note}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="aw-lang-foot">
              Python basics and the core libraries are complete: NumPy, Pandas, Matplotlib,
              Seaborn, Scikit-learn, Streamlit and FastAPI.
            </p>
          </Reveal>

          <div className="aw-skill-groups">
            {groups.map((group, i) => (
              <Reveal key={group.title} delay={Math.min(i * 0.04, 0.2)}>
                <article className="aw-skill-group">
                  <div className="aw-skill-group-top">
                    <h3>{group.title}</h3>
                    <span
                      className={`aw-skill-done${
                        group.tone === "progress" ? " aw-skill-done--progress" : ""
                      }`}
                    >
                      {group.tone === "progress" ? (
                        <span className="aw-skill-progress-dot" />
                      ) : (
                        <Check size={9} strokeWidth={2.4} />
                      )}{" "}
                      {group.badge}
                    </span>
                  </div>
                  <p>{group.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Learning />
      </div>
    </section>
  );
}
