import { useState } from "react";
import { Accordion, type AccordionItem, Reveal, SectionHead } from "./ui";

const faqs: AccordionItem[] = [
  {
    title: "Which project should I open first?",
    body: "Xpect AI. Eight thousand titles, 384-dim embeddings and FAISS top-5 in a single search box — it is the fastest way to see the retrieval layer. PayPal Copilot is the next stop if you care about agents.",
  },
  {
    title: "Is he available right now?",
    body: "Yes — open to AI/ML internships and remote roles, available immediately. Atherva client work runs alongside, with scope written down before anything starts.",
  },
  {
    title: "Does he need visa sponsorship?",
    body: "That is not stated publicly. Compensation, notice period and visa details are not in the knowledge base, so the honest move is to ask directly: peerather07@gmail.com.",
  },
  {
    title: "Are the live apps free?",
    body: "Yes. Every demo is free and needs no login. Streamlit Community Cloud apps sleep after inactivity, so the first visit wakes them in about 20 seconds. Atlas Agent is paused, so only its code is linked.",
  },
  {
    title: "Are the Atherva case studies real client results?",
    body: "No invented outcomes. The case studies are illustrative blueprints, and Alerti and Marketify are labelled in development until they ship.",
  },
  {
    title: "What is not in his stack?",
    body: "Java, Rust, TensorFlow, LangChain and mobile are not claimed. PyTorch, Docker and AWS are marked learning. Python, RAG, agents, FastAPI, SQL and React are shipped and linked.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 pb-24 sm:px-8">
      <SectionHead
        eyebrow="FAQ"
        title={
          <>
            Curious about{" "}
            <br />
            something?
          </>
        }
        sub="Plain answers to the questions that usually come up before a call."
        className="max-w-md"
      />

      <Reveal delay={0.08} className="mx-auto mt-8 max-w-2xl">
        <Accordion items={faqs} open={open} setOpen={setOpen} />
      </Reveal>
    </section>
  );
}
