import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";

const reviews = [
  {
    quote: "Ather didn't just understand RAG — he rewrote core algorithms from scratch. His scikit-learn models predicted our downstream metrics flawlessly.",
    name: "Amazon ML Summer School Scientists",
    role: "Assessment Reviewer 2026",
    photo: "https://images.pexels.com/photos/7580937/pexels-photo-7580937.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "He is a self-driven Product Engineer. Within 15 days, he indexed and mapped 8,800 movie titles inside ChromaDB, deploying a real-time recommendation engine live.",
    name: "Tata Consultancy Services Simulation",
    role: "Job Simulation Evaluator",
    photo: "https://images.pexels.com/photos/18999183/pexels-photo-18999183.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "No abstraction is safe with Ather. He understands the math beneath the library. Absolute top 1% engineering candidate in the AI specialization space.",
    name: "LPU Engineering Dept",
    role: "Academic Mentor",
    photo: "https://images.pexels.com/photos/20139545/pexels-photo-20139545.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

export default function Expertise() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const next = () => setIndex((v) => (v === reviews.length - 1 ? 0 : v + 1));
  const prev = () => setIndex((v) => (v === 0 ? reviews.length - 1 : v - 1));

  return (
    <section id="expertise" ref={ref} className="bg-[#f0f3f6] dark:bg-[#07080a] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime"
        >
          · YOUR IMPACT
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          Deploy here.
          <br />
          <span className="font-serif italic font-normal text-[#5c85d6] dark:text-lime-deep">Impact everywhere.</span>
        </motion.h2>
        <p className="mt-4 text-sm text-ink/60 max-w-md mx-auto">
          Every algorithm deployed resolves a business metric. Rigorous pipelines prevent downstream hallucinations.
        </p>

        {/* Immersive interactive sliding review box */}
        <div className="mt-14 relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#7ea6f2]/10 to-[#e8cef2]/10 blur-3xl rounded-full" />
          
          <div className="clay-card relative p-8 sm:p-12 md:p-16 min-h-[300px] flex flex-col justify-between overflow-hidden">
            
            {/* Quote bubble decoration */}
            <div className="absolute top-6 right-8 text-lime-deep opacity-10">
              <Quote size={120} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="fill-lime text-lime-deep h-4.5 w-4.5" />
                    ))}
                  </div>
                  
                  <p className="text-lg sm:text-2xl font-serif italic text-ink leading-relaxed">
                    "{reviews[index].quote}"
                  </p>
                </div>

                <div className="mt-8 flex flex-col items-center gap-3">
                  <img
                    src={reviews[index].photo}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-ink">{reviews[index].name}</h4>
                    <p className="text-xs text-ink/50 mt-0.5">{reviews[index].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${
                  index === i ? "bg-ink dark:bg-white scale-125" : "bg-ink/15 dark:bg-white/10"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Nav buttons */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={prev}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/70 hover:bg-white text-ink transition shadow-sm"
              aria-label="Previous slider item"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={next}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/70 hover:bg-white text-ink transition shadow-sm"
              aria-label="Next slider item"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
