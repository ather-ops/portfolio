import { Bot, Braces, Layers, Rocket, ShieldCheck, Sigma } from "lucide-react";
import { Reveal, SectionHead } from "./ui";

const features = [
  {
    icon: Layers,
    title: "Grounded retrieval",
    body: "FAISS, SentenceTransformers and prompts that stay inside the retrieved context.",
  },
  {
    icon: Bot,
    title: "Agents with a leash",
    body: "Allowlists, retries, timeouts and fallback paths — not a happy-path demo loop.",
  },
  {
    icon: Sigma,
    title: "ML from scratch",
    body: "Gradients derived in NumPy before scikit-learn is called, checked against it.",
  },
  {
    icon: Braces,
    title: "APIs that hold",
    body: "FastAPI, asyncio, Pydantic and OAuth that survive real requests and failures.",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails & tests",
    body: "pytest coverage, grounded answers and a human review step where it matters.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    body: "Nine deployments on Streamlit, Render and Vercel — each with a working link.",
  },
];

export default function Features() {
  return (
    <section id="expertise" className="px-5 pb-24 sm:px-8">
      <SectionHead
        eyebrow="Core features"
        title={
          <>
            Everything you need{" "}
            <br />
            to ship with AI
          </>
        }
        sub="The unglamorous parts that decide whether a demo survives contact with users."
        className="max-w-xl"
      />

      <div className="mx-auto mt-9 grid max-w-5xl gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delay={index * 0.04}>
              <article className="surface h-full p-6">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#e7e2d8] bg-[#faf8f3] text-ink/70">
                  <Icon size={15} strokeWidth={1.7} />
                </span>
                <h3 className="display mt-4 text-[22px] leading-tight">{feature.title}</h3>
                <p className="mt-2 text-[11.5px] leading-relaxed text-[#6d6a62]">{feature.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
