export type CaseStatus = "Live" | "Code" | "Case study" | "Paused" | "Ongoing";
export type CaseTint = "lav" | "blue" | "peach" | "green" | "dark";

export type CaseStudy = {
  slug: string;
  name: string;
  index: string;
  category: string;
  year: string;
  status: CaseStatus;
  tint: CaseTint;
  title: string;
  accent: string;
  summary: string;
  intro: string;
  role: string;
  timeline: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  problem: string;
  approach: { title: string; body: string }[];
  shipped: string[];
  outcome: string;
  next: string;
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "paypal-copilot",
    name: "PayPal Copilot",
    index: "01",
    category: "Agentic AI · Fintech",
    year: "2026",
    status: "Live",
    tint: "dark",
    title: "Disputes with a",
    accent: "paper trail.",
    summary:
      "A merchant dispute agent that reads PayPal Sandbox cases, retrieves policy and returns one of five reviewable recommendations.",
    intro:
      "Merchant disputes are a policy problem and an API problem at the same time. This agent connects to the PayPal Sandbox, retrieves the relevant policy, and ends every run with a structured recommendation a person can defend.",
    role: "Solo build · agent design, retrieval, API integration, tests",
    timeline: "PayPal AI Hackathon 2026",
    metrics: [
      { value: "5", label: "structured outcomes" },
      { value: "3", label: "allowed tools" },
      { value: "5", label: "max tool rounds" },
    ],
    stack: ["Python", "Groq function calling", "FAISS", "SentenceTransformers", "PayPal REST API", "Streamlit", "pytest"],
    links: [
      { label: "Open live demo", href: "https://paypal-copilot-agenta.streamlit.app/" },
      { label: "Read the code", href: "https://github.com/ather-ops/paypal-copilot" },
    ],
    problem:
      "A generic chatbot cannot resolve a dispute safely. It needs live case data, the right policy context, a bounded set of actions, and a recommendation that a merchant can review instead of an irreversible decision made by a model.",
    approach: [
      {
        title: "Secure the case data",
        body: "OAuth against the PayPal Sandbox with token caching and explicit error handling. The agent pulls the dispute record before it reasons about anything.",
      },
      {
        title: "Retrieve the policy",
        body: "Policy guidance is embedded with all-MiniLM-L6-v2 and retrieved from a FAISS index. The prompt is grounded in the retrieved passages, not in model memory.",
      },
      {
        title: "Bound the agent",
        body: "A custom Groq function-calling loop runs at temperature 0.1, with an explicit three-tool allowlist and a maximum of five rounds. It must land on one of five outcomes: FIGHT, REFUND, OFFER, GATHER_MORE_EVIDENCE or ESCALATE.",
      },
    ],
    shipped: [
      "Live Streamlit app with a human-review step before any merchant action.",
      "Five structured recommendations instead of free-form advice.",
      "pytest coverage for authentication, disputes, policy search and the agent loop.",
      "An explicit tool allowlist so the model cannot execute arbitrary code.",
    ],
    outcome:
      "The useful part is not that an LLM can write about a dispute — it is that every answer arrives with a policy trail, a fixed decision vocabulary and a human holding the final button.",
    next:
      "Add an evaluation set of historical disputes and a persistent audit log, so recommendation quality can be measured instead of judged one case at a time.",
  },
  {
    slug: "amazn-ai",
    name: "AMAZN AI",
    index: "02",
    category: "Multi-tool agent",
    year: "2026",
    status: "Live",
    tint: "blue",
    title: "Three tools.",
    accent: "One answer.",
    summary:
      "A smolagents CodeAgent that routes between product search, support policy and a live order lookup — then chains the tools into one answer.",
    intro:
      "Most support questions need more than one source. This agent decides whether a question belongs to product retrieval, support retrieval or a live order lookup, and can chain all three before it answers.",
    role: "Solo build · agent routing, two RAG pipelines, UI",
    timeline: "2026 · deployed on Streamlit Cloud",
    metrics: [
      { value: "1,465", label: "products indexed" },
      { value: "476", label: "support chunks" },
      { value: "3", label: "routable tools" },
    ],
    stack: ["Python", "smolagents", "FAISS", "SentenceTransformers", "Groq", "Google Sheets API", "PyMuPDF", "Streamlit"],
    links: [
      { label: "Open live demo", href: "https://amazn-agentic-ai.streamlit.app/" },
      { label: "Read the code", href: "https://github.com/ather-ops/Amazn-AI" },
    ],
    problem:
      "A product question and an order-status question look identical in a chat box. A single retrieval index either misses the order data or pollutes product answers with policy language.",
    approach: [
      {
        title: "Separate the corpora",
        body: "Two independent FAISS indexes: 1,465 product records and 476 chunks extracted with PyMuPDF from a 134-page Amazon-style support knowledge base.",
      },
      {
        title: "Add live data",
        body: "A read-only Google Sheets order tool sits beside the two retrieval tools. The agent can check an order without giving the model write access to anything.",
      },
      {
        title: "Adapt the run",
        body: "A two-step fast agent handles simple questions; a ten-step agent is the fallback for multi-hop ones. Three retries and a 60-second timeout keep a bad tool call from hanging the session.",
      },
    ],
    shipped: [
      "A CodeAgent that routes and chains Product RAG, Support RAG and order lookup.",
      "Two isolated indexes with separate embedding pipelines.",
      "Read-only order access through Google Sheets.",
      "Fast-path execution with a larger fallback loop, retries and a timeout.",
    ],
    outcome:
      "The agent can answer “where is my order, and can I still return it?” in one pass, with the order lookup and the return policy kept as separate, inspectable tool calls.",
    next:
      "A small evaluation set of multi-hop questions, plus per-tool latency reporting so routing mistakes are visible rather than buried in a chat transcript.",
  },
  {
    slug: "xpect-ai",
    name: "Xpect AI",
    index: "03",
    category: "RAG · Semantic search",
    year: "2026",
    status: "Live",
    tint: "lav",
    title: "Meaning, not",
    accent: "keywords.",
    summary:
      "Semantic search over 8,807 Netflix titles with 384-dim embeddings, FAISS top-5 retrieval and answers held to the retrieved context.",
    intro:
      "“A sad movie with a hopeful ending” is a terrible keyword query and a good embedding query. Xpect turns plain-English intent into a short, grounded list of films — and shows its work.",
    role: "Solo build · retrieval, prompt, evaluation by inspection, UI",
    timeline: "0 → deployed in 15 days · 183 commits",
    metrics: [
      { value: "8,807", label: "titles indexed" },
      { value: "384", label: "embedding dimensions" },
      { value: "5", label: "grounded results" },
    ],
    stack: ["Python", "FAISS", "all-MiniLM-L6-v2", "Groq gpt-oss-20b", "Streamlit"],
    links: [
      { label: "Open live demo", href: "https://x-ai-test.streamlit.app/" },
      { label: "Read the code", href: "https://github.com/ather-ops/Xpect-AI" },
    ],
    problem:
      "Keyword search cannot answer a vibe. It matches strings, not meaning, and it gives a user no confidence that the result actually belongs to the query.",
    approach: [
      {
        title: "Embed the catalogue",
        body: "All 8,807 titles are encoded with all-MiniLM-L6-v2 into 384-dimensional vectors, then written to a FAISS index for exact nearest-neighbour search.",
      },
      {
        title: "Retrieve before generating",
        body: "A query becomes a vector, FAISS returns the top five titles, and the LLM receives only those records. The system prompt restricts the answer to the retrieved context.",
      },
      {
        title: "Rebuild the weak layer",
        body: "The first version used ChromaDB and NLTK. Replacing both with FAISS and lightweight pure-Python preprocessing cut moving parts; moving from Gemini 2.5 Flash to Groq gpt-oss-20b made the loop noticeably faster.",
      },
    ],
    shipped: [
      "End-to-end semantic search over 8,807 titles.",
      "Top-5 retrieval with context-restricted generation.",
      "A leaner FAISS + pure-Python retrieval layer.",
      "A public demo shipped in 15 days across 183 commits.",
    ],
    outcome:
      "The system answers with five candidates and a reason, instead of a confident paragraph that may not correspond to anything in the catalogue.",
    next:
      "Hybrid retrieval — BM25 plus embeddings — and a held-out query set so relevance can be scored instead of eyeballed.",
  },
  {
    slug: "pulsemesh",
    name: "PulseMesh",
    index: "04",
    category: "Backend · Async APIs",
    year: "2026",
    status: "Live",
    tint: "peach",
    title: "Many APIs.",
    accent: "One response.",
    summary:
      "An async API intelligence engine: concurrent requests, per-call timeouts and retries, normalized results and one FastAPI contract.",
    intro:
      "PulseMesh is the unglamorous layer that makes multi-source products usable: fan out to many APIs at once, keep each failure contained, and return a single typed response.",
    role: "Solo build · FastAPI service, async engine, dashboard",
    timeline: "2026 · FastAPI on Render + Streamlit",
    metrics: [
      { value: "Async", label: "concurrent fan-out" },
      { value: "1", label: "unified response" },
      { value: "per-call", label: "timeout + retry" },
    ],
    stack: ["Python", "FastAPI", "asyncio", "aiohttp", "Pydantic", "Uvicorn", "Streamlit", "Render"],
    links: [
      { label: "Open live dashboard", href: "https://pulsh-mesh.streamlit.app/" },
      { label: "Inspect the API docs", href: "https://pulse-ai-xkbk.onrender.com/docs" },
      { label: "Read the code", href: "https://github.com/ather-ops/pulsemesh" },
    ],
    problem:
      "Calling five APIs in sequence is slow, and one bad endpoint can take down the whole result. Most dashboards hide that fragility behind a spinner.",
    approach: [
      {
        title: "Fan out, don't queue",
        body: "asyncio and aiohttp launch the upstream calls concurrently, so total latency is closer to the slowest call than the sum of every call.",
      },
      {
        title: "Contain each failure",
        body: "Every request gets its own timeout and retry policy. A failure returns a normalized error envelope instead of aborting the batch.",
      },
      {
        title: "Typed contract, single response",
        body: "Pydantic validates the request and shapes the response: success count, failure count, per-source status, data and error details. FastAPI exposes the same contract at /docs.",
      },
    ],
    shipped: [
      "Concurrent multi-API aggregation with a FastAPI backend.",
      "Per-request timeout, retry and error normalization.",
      "A single response with total, successful and failed counts.",
      "A Streamlit dashboard and public interactive API docs.",
    ],
    outcome:
      "The UI gets one predictable payload, and a failed upstream API degrades one row instead of blanking the page. The contract is visible to anyone who opens /docs.",
    next:
      "Response caching by source, a circuit breaker for repeatedly failing APIs, and structured request tracing.",
  },
  {
    slug: "hospital-sql",
    name: "Hospital Management SQL",
    index: "05",
    category: "SQL · Data analytics",
    year: "2026",
    status: "Live",
    tint: "green",
    title: "A hospital database",
    accent: "that answers questions.",
    summary:
      "A five-table relational hospital model turned into an analytical reporting app: revenue, no-shows, cancellations and treatment mix.",
    intro:
      "A schema is only useful when it can answer the questions an operator actually asks. This project models patients, doctors, appointments, treatments and billing, then turns that model into a live reporting layer.",
    role: "Solo build · schema design, analytical SQL, reporting UI",
    timeline: "2026 · SQLite + Streamlit",
    metrics: [
      { value: "5", label: "relational tables" },
      { value: "16", label: "business questions" },
      { value: "CSV", label: "report exports" },
    ],
    stack: ["SQL", "SQLite", "Python", "Streamlit", "CSV reporting"],
    links: [
      { label: "Open live dashboard", href: "https://hospital-management--agent.streamlit.app/" },
      { label: "Read the code", href: "https://github.com/ather-ops/Hospital-Management-SQL" },
    ],
    problem:
      "Operational data lives across patients, doctors, appointments, treatments and billing. Counting rows is easy; answering who is generating revenue, who is missing appointments and which treatments are growing is not.",
    approach: [
      {
        title: "Model the relationships",
        body: "Five linked tables with primary and foreign keys: patients → appointments → doctors, appointments → treatments, and patients → billing.",
      },
      {
        title: "Write the questions in SQL",
        body: "Joins, aggregations, grouping and filtering answer revenue by doctor, failed payments, no-shows, cancellations, treatment volume and payment-method mix.",
      },
      {
        title: "Ship the read-out",
        body: "A Streamlit dashboard runs the same SQL and renders the results for a non-technical reader, with CSV exports for follow-up work.",
      },
    ],
    shipped: [
      "A production-style five-table relational schema.",
      "Sixteen analytical questions answered with multi-table SQL.",
      "A live reporting dashboard and CSV export path.",
      "A data model that separates operational records from financial reporting.",
    ],
    outcome:
      "The database stops being a storage exercise and becomes an operational read-out: which doctors generate revenue, where payments fail, and which appointments never happen.",
    next:
      "Parameterized views for date ranges and an ORM-backed API so the same model can power other interfaces.",
  },
  {
    slug: "ml-from-scratch",
    name: "ML from Scratch",
    index: "06",
    category: "Machine learning · NumPy",
    year: "2025–26",
    status: "Ongoing",
    tint: "lav",
    title: "Every gradient,",
    accent: "written by hand.",
    summary:
      "A math-first ML track built from scratch in NumPy and Python — no scikit-learn until the algorithm is understood — with two live demos.",
    intro:
      "This is the layer beneath the library call: custom train-test splits, hand-written scaling, gradient descent, loss functions and evaluation. The goal is not to avoid scikit-learn; it is to know what it is doing.",
    role: "Solo build · algorithms, training loops, demos, notes",
    timeline: "2025 → ongoing",
    metrics: [
      { value: "545", label: "housing records" },
      { value: "0.9767", label: "R² · Ridge check" },
      { value: "80.9%", label: "Titanic accuracy" },
    ],
    stack: ["Python", "NumPy", "Pandas", "Matplotlib", "Scikit-learn (comparison)", "Streamlit"],
    links: [
      { label: "Read the code", href: "https://github.com/ather-ops/Supervised-ML-from-scratch" },
      { label: "House Price live demo", href: "https://ather-ops-supervised-ml-fro-linear-regressionprojectsapp-g6x3xg.streamlit.app/" },
      { label: "Spam Detector live demo", href: "https://spam-ai.streamlit.app/" },
    ],
    problem:
      "It is easy to fit a model and hard to explain why it moved. Calling fit() hides the scaling, the gradient step and the failure modes that matter when a model reaches production.",
    approach: [
      {
        title: "Build the foundation",
        body: "Data cleaning and preprocessing first, including scaling and normalization written by hand rather than imported.",
      },
      {
        title: "Write the training loop",
        body: "Linear regression and logistic regression implemented with explicit cost functions, gradients and gradient-descent updates, evaluated with MAE, MSE, RMSE and classification metrics.",
      },
      {
        title: "Compare against the library",
        body: "The same data is run through scikit-learn for a sanity check. Ridge regression matches scikit-learn exactly at MSE 0.4598 / R² 0.9767; the Titanic random forest reaches 80.9% test accuracy.",
      },
    ],
    shipped: [
      "Data cleaning, scaling and normalization implemented by hand.",
      "Linear and logistic regression with custom training loops.",
      "Decision trees and random forests in a separate from-scratch repository.",
      "Two live Streamlit demos and a growing public notebook library.",
    ],
    outcome:
      "The value is diagnostic: when a library model underperforms, there is a mental model of the loss surface, the split and the scaling step to debug against.",
    next:
      "Complete KNN, Naive Bayes, SVM and regularised regression, then unify the algorithms behind one runner and a shared evaluation harness.",
  },
  {
    slug: "house-price-predictor",
    name: "House Price Predictor",
    index: "07",
    category: "ML from scratch · Regression",
    year: "2026",
    status: "Live",
    tint: "blue",
    title: "A price, predicted",
    accent: "from first principles.",
    summary:
      "Multiple linear regression in NumPy, trained with gradient descent on 545 housing records and shipped as an interactive predictor.",
    intro:
      "A small, complete regression project: five numerical features, a custom train-test split, feature and target scaling, a hand-written gradient-descent loop and a live input form.",
    role: "Solo build · model, training, UI",
    timeline: "2026",
    metrics: [
      { value: "545", label: "housing records" },
      { value: "5", label: "input features" },
      { value: "NumPy", label: "model core" },
    ],
    stack: ["Python", "NumPy", "Pandas", "Streamlit", "Joblib"],
    links: [
      { label: "Open live demo", href: "https://ather-ops-supervised-ml-fro-linear-regressionprojectsapp-g6x3xg.streamlit.app/" },
      { label: "Read the code", href: "https://github.com/ather-ops/Supervised-ML-from-scratch" },
    ],
    problem:
      "A housing price is a clean way to see whether the regression math actually works: the features are numeric, the target is continuous and every preprocessing step can be inspected.",
    approach: [
      {
        title: "Prepare without leakage",
        body: "A custom train-test split happens before scaling. Features and target are normalized separately, and the training-only statistics are reused at inference.",
      },
      {
        title: "Train with gradient descent",
        body: "The model updates weights and bias against MSE, with explicit learning-rate and iteration controls instead of a library estimator.",
      },
      {
        title: "Save the whole contract",
        body: "Trained parameters, scaling statistics and feature order are saved together and loaded by the Streamlit form, so a prediction cannot silently use the wrong columns.",
      },
    ],
    shipped: [
      "A multiple linear regression model implemented in NumPy.",
      "Custom scaling, training and evaluation with MAE, MSE and RMSE.",
      "A live Streamlit predictor using saved parameters.",
    ],
    outcome:
      "The demo is intentionally simple. The interesting part is that every number between the input form and the prediction is visible in the repository.",
    next:
      "Add L2 regularisation and a residual plot so the model's error pattern is as visible as its prediction.",
  },
  {
    slug: "spam-detector",
    name: "Spam Detector",
    index: "08",
    category: "ML from scratch · Classification",
    year: "2026",
    status: "Live",
    tint: "peach",
    title: "Spam or not,",
    accent: "from scratch.",
    summary:
      "Logistic regression written by hand — sigmoid, binary cross-entropy and gradient descent — with a live message classifier.",
    intro:
      "The binary classification companion to the housing model: text goes in, a probability comes out, and every step between them is implemented rather than imported.",
    role: "Solo build · model, training, UI",
    timeline: "2026",
    metrics: [
      { value: "sigmoid", label: "activation" },
      { value: "log loss", label: "objective" },
      { value: "live", label: "demo" },
    ],
    stack: ["Python", "NumPy", "Pandas", "Streamlit"],
    links: [
      { label: "Open live demo", href: "https://spam-ai.streamlit.app/" },
      { label: "Read the code", href: "https://github.com/ather-ops/Supervised-ML-from-scratch" },
    ],
    problem:
      "Classification tutorials often stop at the sigmoid diagram. A deployed classifier forces decisions about thresholding, feature representation and what a probability actually means to a user.",
    approach: [
      {
        title: "Implement the objective",
        body: "The sigmoid activation, binary cross-entropy loss and gradient computation are written explicitly in NumPy.",
      },
      {
        title: "Train and threshold",
        body: "Gradient descent updates the weights; the output probability is thresholded for the spam / not-spam decision, with the trade-off kept visible.",
      },
      {
        title: "Expose the probability",
        body: "The Streamlit UI reports the probability, not just the label, so a borderline message looks borderline instead of falsely certain.",
      },
    ],
    shipped: [
      "Logistic regression with a hand-written sigmoid and loss.",
      "A trained, saved classifier loaded by the app.",
      "A live Streamlit demo that shows the probability behind the label.",
    ],
    outcome:
      "The model is small, but it demonstrates the full classification loop: representation, objective, optimisation, threshold and interface.",
    next:
      "Add precision/recall reporting and a tunable decision threshold so the cost of false positives is explicit.",
  },
  {
    slug: "customer-churn",
    name: "Customer Churn Predictor",
    index: "09",
    category: "Applied ML · Retention",
    year: "2026",
    status: "Code",
    tint: "green",
    title: "Churn risk,",
    accent: "before it happens.",
    summary:
      "A production-shaped logistic-regression pipeline that scores telecom customers in batches and saves the model, scaler and column contract.",
    intro:
      "A churn model is only useful if it can score the next batch of customers without crashing on an unseen category. This project focuses on the unglamorous parts: encoding, column alignment and saved artifacts.",
    role: "Solo build · pipeline, batch inference, evaluation",
    timeline: "2026",
    metrics: [
      { value: "9", label: "engineered features" },
      { value: "batch", label: "prediction" },
      { value: "3", label: "saved artifacts" },
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "Joblib", "Matplotlib"],
    links: [{ label: "Read the code", href: "https://github.com/ather-ops/Customer-churn-predictor" }],
    problem:
      "A retention team does not need one prediction at a time. It needs a repeatable batch score, with the same preprocessing used in training, before the customer cancels.",
    approach: [
      {
        title: "Encode and align",
        body: "Categorical fields are one-hot encoded, and any training column missing from new data is added with a zero value so the matrix shape always matches.",
      },
      {
        title: "Pipeline the preprocessing",
        body: "Scaling and the model live in one pipeline, preventing the scaler from being fitted on data it should not see.",
      },
      {
        title: "Save the contract",
        body: "Model, scaler and training-column list are saved separately with Joblib. Loading only the model is the classic way to produce silently wrong predictions.",
      },
    ],
    shipped: [
      "A logistic-regression churn pipeline with batch inference.",
      "Explicit handling for unseen categorical combinations.",
      "Saved model, scaler and column contract for reproducible scoring.",
      "A clear read on the strongest churn signals: short tenure, month-to-month contracts and electronic-check payment.",
    ],
    outcome:
      "The model produces a risk list a retention team can act on, and the saved contract means the next batch is scored the same way as the first.",
    next:
      "Wrap batch scoring in a small FastAPI endpoint and log drift in the input feature distribution.",
  },
  {
    slug: "rain-predictor",
    name: "Rain Predictor",
    index: "10",
    category: "Applied ML · Classification",
    year: "2026",
    status: "Code",
    tint: "blue",
    title: "Rain tomorrow,",
    accent: "with probabilities.",
    summary:
      "A logistic-regression weather classifier over five measurements, with a saved pipeline, a probability gauge and a balanced 550-row dataset.",
    intro:
      "A compact end-to-end classifier: five weather inputs, a balanced dataset, a saved scalar/model pipeline and a UI that reports probability instead of pretending to be certain.",
    role: "Solo build · data prep, model, Streamlit UI",
    timeline: "2026",
    metrics: [
      { value: "550", label: "balanced samples" },
      { value: "62%", label: "accuracy" },
      { value: "0.64", label: "rain F1" },
    ],
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Joblib", "Streamlit"],
    links: [{ label: "Read the code", href: "https://github.com/ather-ops/Rain-Predictor-App" }],
    problem:
      "The user does not need a binary “rain / no rain” verdict from a weak model. They need a calibrated-enough probability and a clear sense of which inputs moved it.",
    approach: [
      {
        title: "Start balanced",
        body: "The 550-row dataset is split evenly between rain and no-rain, so accuracy is not flattered by a majority class.",
      },
      {
        title: "Choose interpretability",
        body: "Logistic regression was chosen because its coefficients map to meteorological intuition: higher humidity and lower pressure increase rain probability.",
      },
      {
        title: "Ship the probability",
        body: "The Streamlit app renders a gauge, a confidence score and a colour-coded result. The scalar and model are saved together and loaded as one pipeline.",
      },
    ],
    shipped: [
      "A logistic-regression classifier over five weather inputs.",
      "Accuracy 62%, rain precision 0.65 and rain F1 0.64 on the held-out set.",
      "A saved preprocessing/model pipeline and a Streamlit interface.",
    ],
    outcome:
      "The model is honest about being modest. The interface shows a probability, which is more useful than a hard label from a 62%-accuracy classifier.",
    next:
      "Calibrate the probabilities and collect more samples; the ceiling here is data, not model complexity.",
  },
  {
    slug: "cafe-sales-analysis",
    name: "Cafe Sales Analysis",
    index: "11",
    category: "Data analysis · EDA",
    year: "2026",
    status: "Case study",
    tint: "peach",
    title: "Ten thousand receipts,",
    accent: "one story.",
    summary:
      "Cleaning and profiling a deliberately messy 10,000-transaction cafe dataset, then turning the findings into a clear revenue narrative.",
    intro:
      "A data-cleaning case study rather than a model: missing values, error placeholders, type fixes, engineered categories and an EDA read-out that changes what the cafe should promote.",
    role: "Solo analysis · cleaning, feature engineering, EDA",
    timeline: "2026",
    metrics: [
      { value: "10,000", label: "transactions" },
      { value: "~40%", label: "missing location" },
      { value: "2.7×", label: "weekday vs weekend" },
    ],
    stack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    links: [],
    problem:
      "The raw file is the kind of dataset that looks fine in a preview and falls apart under analysis: missing values, inconsistent placeholders, wrong types and outliers that distort totals.",
    approach: [
      {
        title: "Clean before counting",
        body: "Missing values and error placeholders were handled explicitly, types were corrected, and day, item, price and size categories were engineered for grouping.",
      },
      {
        title: "Treat the outliers",
        body: "IQR inspection identified extreme transactions; both removal and capping were tested so the revenue read-out was not driven by a handful of rows.",
      },
      {
        title: "Ask business questions",
        body: "Revenue by item, weekday versus weekend, and the location gap were compared side by side instead of dumping every chart into a report.",
      },
    ],
    shipped: [
      "A cleaned 10,000-row transaction dataset with engineered categories.",
      "Outlier treatment with IQR removal and capping compared.",
      "A concise EDA read-out: Salad led revenue despite Juice selling more; weekdays earned ₹64,897 vs ₹24,346 on weekends; roughly 40% of sales had no location recorded.",
    ],
    outcome:
      "The analysis changed the obvious answer. Juice had the volume, but Salad carried revenue — and the missing-location field was a data collection problem, not a customer behaviour insight.",
    next:
      "Turn the cleaning steps into a reusable pipeline and publish the cleaned dataset with a short data dictionary.",
  },
  {
    slug: "decision-trees-forest",
    name: "Trees & Forests",
    index: "12",
    category: "ML from scratch · Ensembles",
    year: "2026",
    status: "Code",
    tint: "green",
    title: "Trees and forests,",
    accent: "both ways.",
    summary:
      "Decision trees, random forests and gradient boosting implemented from scratch and with scikit-learn, benchmarked on a drug-classification task.",
    intro:
      "A complete, intentionally finite study of tree models: the impurity maths and recursive splitting from scratch, the same workflow in scikit-learn, and a gradient-boosting comparison.",
    role: "Solo build · algorithms, notebooks, evaluation",
    timeline: "2026 · complete",
    metrics: [
      { value: "5", label: "drug classes" },
      { value: "2", label: "implementations" },
      { value: "80.9%", label: "Titanic accuracy" },
    ],
    stack: ["Python", "NumPy", "Pandas", "Scikit-learn", "Matplotlib"],
    links: [{ label: "Read the code", href: "https://github.com/ather-ops/decision-trees-forest" }],
    problem:
      "Tree libraries hide the decisions that matter: which split is chosen, why a tree overfits, and how bagging turns a high-variance model into a stable one.",
    approach: [
      {
        title: "Implement the split",
        body: "Gini impurity and information gain are computed by hand, then the tree is grown recursively with greedy, axis-aligned splits.",
      },
      {
        title: "Build the forest",
        body: "Bootstrap sampling, feature randomisation and majority voting are implemented from scratch before the equivalent scikit-learn workflow is run.",
      },
      {
        title: "Benchmark the ensemble",
        body: "The final drug-classification project compares decision tree, random forest and gradient boosting, with a Titanic random forest at 80.9% test accuracy.",
      },
    ],
    shipped: [
      "Decision tree and random forest implementations in NumPy.",
      "Equivalent scikit-learn notebooks for side-by-side comparison.",
      "A gradient-boosting extension benchmarked against the forest.",
      "A complete drug-classification project across five classes.",
    ],
    outcome:
      "The from-scratch and library versions agree closely, which is the point: the library is fast, but the mechanics are no longer opaque.",
    next:
      "Add out-of-bag error reporting and a small feature-importance explainer.",
  },
  {
    slug: "atlas-agent",
    name: "Atlas Agent",
    index: "13",
    category: "Agentic AI · Autonomous",
    year: "2026",
    status: "Paused",
    tint: "dark",
    title: "An agent that",
    accent: "picks its tools.",
    summary:
      "A smolagents assistant that plans, selects a tool and executes — with date/time, system info and live weather working today.",
    intro:
      "Atlas is the research edge of the agent work: a general assistant that decides which tool to use instead of following a fixed workflow. The public deployment is paused while the memory layer is rebuilt.",
    role: "Solo build · agent, tools, deployment",
    timeline: "2026 · paused for rebuild",
    metrics: [
      { value: "3", label: "working tools" },
      { value: "smolagents", label: "agent runtime" },
      { value: "1", label: "paused demo" },
    ],
    stack: ["Python", "smolagents", "Groq / HF Inference", "Gradio", "OpenWeather API", "FastAPI"],
    links: [{ label: "Read the code", href: "https://github.com/ather-ops/atlas-agent" }],
    problem:
      "A fixed chain can only answer questions its author anticipated. A general agent needs a planner, a tool registry and a safe stopping condition.",
    approach: [
      {
        title: "Plan first",
        body: "The smolagents loop reasons about the request, chooses from the available tools and decides when it has enough information to answer.",
      },
      {
        title: "Start with safe tools",
        body: "Date/time, system information and live weather are read-only, easy to verify and enough to exercise planning without risking side effects.",
      },
      {
        title: "Pause rather than fake it",
        body: "The Render deployment is paused while RAG memory and multi-agent orchestration are built. The code stays public, and the site labels the status honestly.",
      },
    ],
    shipped: [
      "A working smolagents planner with three read-only tools.",
      "A Gradio interface and a public repository.",
      "A documented pause while the memory and orchestration layers are rebuilt.",
    ],
    outcome:
      "Atlas is deliberately unfinished in public. It is the sandbox where the agent patterns used in PayPal Copilot and Amazn AI get tested before they are applied to a narrower problem.",
    next:
      "RAG-backed memory, a second agent for delegation, and an eval set for tool-selection accuracy.",
  },
  {
    slug: "atherva-automations",
    name: "Atherva Automations",
    index: "14",
    category: "Company · AI automation",
    year: "2026",
    status: "Live",
    tint: "lav",
    title: "An automation studio",
    accent: "for real work.",
    summary:
      "The company: AI agents, assistants, RAG and data intelligence for businesses — with two products in development.",
    intro:
      "Atherva is the commercial layer around the same engineering. The studio builds bounded AI systems for businesses and documents the scope, the data path and the human review before anything ships.",
    role: "Founder · scoping, engineering, delivery",
    timeline: "Founded 2026",
    metrics: [
      { value: "2", label: "products in development" },
      { value: "8", label: "service lines" },
      { value: "1", label: "founder" },
    ],
    stack: ["Python", "FastAPI", "RAG", "Agents", "Streamlit", "Vercel", "SQL"],
    links: [
      { label: "Visit Atherva", href: "https://atherva-automations.vercel.app/" },
      { label: "Alerti Intelligence", href: "https://atherva-automations.vercel.app/alerti" },
      { label: "Marketify", href: "https://atherva-automations.vercel.app/marketify" },
    ],
    problem:
      "Small teams are asked to choose between generic chat tools and custom software they cannot maintain. Atherva's bet is a narrow middle: small, inspectable AI systems with a clear owner and an exit path.",
    approach: [
      {
        title: "Scope before code",
        body: "One problem, one data source and a written definition of done. The free trial starts with a concrete read-out, not a platform migration.",
      },
      {
        title: "Build the smallest system",
        body: "Retrieval, tools, guardrails, retries and a human approval gate where the output faces a customer.",
      },
      {
        title: "Leave the keys",
        body: "Source, prompts and evaluation cases are handed over. No black box and no lock-in — the customer should be able to leave with the system still working.",
      },
    ],
    shipped: [
      "A live company site with an in-browser assistant, Alyxa.",
      "Eight service lines across agents, automation, RAG, assistants and data intelligence.",
      "Alerti Intelligence and Marketify in active development, clearly labelled as unlaunched.",
    ],
    outcome:
      "The company is intentionally small and public about what is not finished. The proof is the same as the portfolio's: working systems, visible code and honest status labels.",
    next:
      "Launch Alerti's first paid pilot, publish a reproducible case study, and keep Marketify behind a human approval gate until it has earned otherwise.",
  },
  {
    slug: "portfolio",
    name: "This Portfolio",
    index: "15",
    category: "Frontend · Product",
    year: "2026",
    status: "Live",
    tint: "blue",
    title: "A portfolio that",
    accent: "explains itself.",
    summary:
      "A React 19 + Vite portfolio with fifteen case studies, hash-routed project pages and a local assistant that answers from a structured knowledge base.",
    intro:
      "The site is a product, not a PDF: a design system, a routing layer, project write-ups, a local assistant and a build that ships as one inspectable file.",
    role: "Solo build · design, frontend, content, deployment",
    timeline: "2026 · ongoing",
    metrics: [
      { value: "15", label: "case studies" },
      { value: "1", label: "HTML output" },
      { value: "0", label: "URI API calls" },
    ],
    stack: ["React 19", "TypeScript", "Vite 7", "Tailwind 4", "framer-motion", "Vercel"],
    links: [
      { label: "Open the live site", href: "https://portfolio-two-pink-24.vercel.app/" },
      { label: "Read the code", href: "https://github.com/ather-ops/portfolio" },
    ],
    problem:
      "A portfolio usually proves that someone can make a landing page. It rarely shows how they think through a project, what broke, or what they would do next.",
    approach: [
      {
        title: "Write the case studies first",
        body: "Every project gets a problem, an approach, what shipped and what comes next. The card grid is an index, not the whole argument.",
      },
      {
        title: "Keep the system small",
        body: "A hash router handles project pages without a server rewrite; the design system is plain CSS variables and a handful of React primitives.",
      },
      {
        title: "Ship no fake proof",
        body: "No invented clients, borrowed logos or placeholder testimonials. Paused and in-development products are labelled as such.",
      },
    ],
    shipped: [
      "Fifteen project pages with deep links and next-case navigation.",
      "A responsive design system with an Awake-inspired hero and Granger-style editorial cards.",
      "URI, a deterministic assistant that answers from a local knowledge base with no API key.",
      "A single-file production build deployed on Vercel.",
    ],
    outcome:
      "The site is now a browsable body of work: a recruiter can open a project, read the engineering reasoning and follow the live demo or the code.",
    next:
      "Add project-level analytics that respect privacy, and keep the case-study index current as the next systems ship.",
  },
];

export const featuredCases = caseStudies.filter((project) => ["paypal-copilot", "xpect-ai", "amazn-ai"].includes(project.slug));
export const otherCases = caseStudies.filter((project) => !featuredCases.includes(project));

export const getCase = (slug: string) => caseStudies.find((project) => project.slug === slug);
