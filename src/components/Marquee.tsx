import { motion } from "framer-motion";
import { stack } from "../data";

export default function Marquee() {
  const items = [...stack, ...stack];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      className="relative overflow-hidden border-b border-line bg-white py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-3 text-[13px] font-medium text-ink/45">
            <span className="grid h-6 w-6 place-items-center rounded-full border border-line text-[10px] text-ink/40">
              ✦
            </span>
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
