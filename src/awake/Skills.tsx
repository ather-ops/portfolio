import { Check, Sparkles } from "lucide-react";
import { Kicker, Reveal } from "./ui";

const languages = [
  { name: "Python", level: 90, note: "Core, OOP, libraries, FastAPI" },
  { name: "SQL", level: 80, note: "Joins, aggregation, schema design" },
  { name: "C", level: 50, note: "Fundamentals, memory, pointers" },
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

const completed = [
  "Hugging Face AI Agents course — completed, all units",
  "FastAPI — APIs, validation and deployment",
  "Docker — images, containers and compose",
  "Python fundamentals + core libraries",
];

const learning = [
  "Building LLMs from scratch — architecture, tokenisation, training",
  "PyTorch for deep learning",
  "AWS — EC2, S3 and Lambda",
  "Google ML Crash Course — embeddings, LLMs, RAG",
  "LangGraph for stateful agent workflows",
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
              {languages.map((lang) => (
                <div key={lang.name} className="aw-lang-row">
                  <div className="aw-lang-top">
                    <span className="aw-lang-name">{lang.name}</span>
                    <span className="aw-lang-pct">{lang.level}%</span>
                  </div>
                  <div
                    className="aw-lang-track"
                    role="progressbar"
                    aria-label={`${lang.name} comfort level`}
                    aria-valuenow={lang.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span className="aw-lang-fill" style={{ width: `${lang.level}%` }} />
                  </div>
                  <p className="aw-lang-note">{lang.note}</p>
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

        <Reveal>
          <div className="aw-learning-panel">
            <div className="aw-learning-head">
              <div>
                <Kicker>Currently learning</Kicker>
                <h3>
                  From LLM APIs
                  <br />
                  to <em className="aw-italic">building my own.</em>
                </h3>
              </div>
              <span className="aw-learning-chip">
                <Sparkles size={11} /> LLM track
              </span>
            </div>

            <div className="aw-learning-cols">
              <div>
                <p className="aw-learning-label">Completed</p>
                <ul className="aw-learning-list aw-learning-list--done">
                  {completed.map((item) => (
                    <li key={item}>
                      <Check size={11} strokeWidth={2.4} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="aw-learning-label">In progress</p>
                <ul className="aw-learning-list">
                  {learning.map((item) => (
                    <li key={item}>
                      <span className="aw-learning-dot" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
