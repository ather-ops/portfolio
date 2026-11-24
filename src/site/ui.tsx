import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Search } from "lucide-react";

export const openUri = () => window.dispatchEvent(new CustomEvent("uri:open"));

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-[11px] font-semibold text-ink transition hover:gap-1.5 hover:text-black ${className}`}
    >
      {children}
      <ArrowUpRight size={13} />
    </a>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : "text-left"} ${className}`}>
      {eyebrow ? (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="display mt-5 text-[38px] leading-[0.98] sm:text-[48px] lg:text-[56px]">{title}</h2>
      </Reveal>
      {sub ? (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 text-[12.5px] leading-relaxed text-[#6d6a62] ${
              centered ? "mx-auto max-w-md" : "max-w-sm"
            }`}
          >
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

const TONES: Record<string, string> = {
  lavender:
    "bg-[radial-gradient(130%_130%_at_15%_0%,#f4ebff_0%,#dcd8ff_38%,#a8b4f7_72%,#6f85e8_100%)]",
  blue: "bg-[radial-gradient(130%_130%_at_20%_0%,#eaf4ff_0%,#c4dbff_35%,#7fa4ec_70%,#315ad2_100%)]",
  peach:
    "bg-[radial-gradient(130%_130%_at_20%_0%,#fff6eb_0%,#ffe0cd_40%,#ffbe9f_72%,#ef9376_100%)]",
  mint: "bg-[radial-gradient(130%_130%_at_20%_0%,#f2fff9_0%,#d4f5e6_40%,#9edcc6_75%,#59b79a_100%)]",
  cream:
    "bg-[radial-gradient(130%_130%_at_20%_0%,#fffdf7_0%,#f5ebd7_45%,#e4cfac_78%,#caa87a_100%)]",
  pink: "bg-[radial-gradient(130%_130%_at_20%_0%,#fff5f8_0%,#ffdde7_40%,#f8b3c8_74%,#e37b9b_100%)]",
  violet:
    "bg-[radial-gradient(130%_130%_at_20%_0%,#f7f0ff_0%,#e3d3ff_40%,#b79bf0_74%,#8b63d8_100%)]",
};

export function ArtTile({
  tone = "lavender",
  className = "",
  children,
}: {
  tone?: keyof typeof TONES | string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`art-tile ${TONES[tone] ?? TONES.lavender} ${className}`}>
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export type MockVariant = "search" | "chat" | "dashboard" | "doc" | "orders" | "pulse";

export function MockApp({
  variant = "search",
  title = "demo",
  className = "",
}: {
  variant?: MockVariant;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`flex h-full w-full items-center justify-center p-4 sm:p-6 ${className}`}>
      <div className="w-full max-w-[300px] overflow-hidden rounded-[16px] border border-white/70 bg-white/85 shadow-[0_18px_40px_rgba(24,32,80,0.16)] backdrop-blur-md">
        <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f0a4a4]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#f0d59b]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#a9dcb4]" />
          <span className="ml-2 truncate text-[8px] font-semibold uppercase tracking-[0.14em] text-black/35">
            {title}
          </span>
        </div>
        <div className="p-3">
          {variant === "search" && <SearchMock />}
          {variant === "chat" && <ChatMock />}
          {variant === "dashboard" && <DashboardMock />}
          {variant === "doc" && <DocMock />}
          {variant === "orders" && <OrdersMock />}
          {variant === "pulse" && <PulseMock />}
        </div>
      </div>
    </div>
  );
}

function SearchMock() {
  return (
    <div>
      <div className="flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-2.5 py-1.5">
        <Search size={9} className="text-black/40" />
        <span className="text-[8px] text-black/45">a film like Interstellar</span>
      </div>
      <div className="mt-2.5 space-y-1.5">
        {[
          ["Contact", "0.94"],
          ["Arrival", "0.91"],
          ["Gravity", "0.88"],
        ].map(([name, score]) => (
          <div key={name} className="flex items-center justify-between rounded-md bg-[#f5f3ee] px-2 py-1.5">
            <span className="text-[8px] font-semibold text-black/70">{name}</span>
            <span className="text-[7px] font-mono text-black/35">{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="space-y-2">
      <div className="ml-auto w-[78%] rounded-[10px] rounded-br-sm bg-[#111110] px-2.5 py-2 text-[8px] leading-snug text-white">
        Dispute #A-1042 — what should I do next?
      </div>
      <div className="w-[86%] rounded-[10px] rounded-tl-sm border border-black/5 bg-white px-2.5 py-2 text-[8px] leading-snug text-black/70">
        Policy says refund if tracking never updated. Recommendation: refund, then request seller evidence.
      </div>
      <div className="flex items-center gap-1 pl-1">
        <span className="h-1 w-1 animate-bounce rounded-full bg-black/30" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-black/30 [animation-delay:120ms]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-black/30 [animation-delay:240ms]" />
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          ["latency", "412ms"],
          ["uptime", "99.9%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md bg-[#f5f3ee] px-2 py-1.5">
            <p className="text-[7px] uppercase tracking-wide text-black/35">{label}</p>
            <p className="text-[10px] font-semibold text-black/75">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex h-14 items-end gap-1.5">
        {[38, 62, 44, 78, 56, 88, 70].map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-t bg-gradient-to-t from-[#315ad2] to-[#9db9f3]"
          />
        ))}
      </div>
    </div>
  );
}

function DocMock() {
  return (
    <div>
      <div className="rounded-md bg-[#f5f3ee] p-2">
        <div className="h-1.5 w-2/3 rounded-full bg-black/20" />
        <div className="mt-1.5 h-1 w-full rounded-full bg-black/10" />
        <div className="mt-1 h-1 w-5/6 rounded-full bg-black/10" />
        <div className="mt-1 h-1 w-3/4 rounded-full bg-black/10" />
      </div>
      <div className="mt-2 flex gap-1.5">
        <span className="rounded-full bg-[#e7f5ec] px-2 py-0.5 text-[6.5px] font-semibold text-[#2f7a4d]">
          retrieved
        </span>
        <span className="rounded-full bg-[#eef1fb] px-2 py-0.5 text-[6.5px] font-semibold text-[#3b56a8]">
          grounded
        </span>
      </div>
    </div>
  );
}

function OrdersMock() {
  return (
    <div className="space-y-1.5">
      {[
        ["#1024", "Shipped"],
        ["#1025", "Packed"],
        ["#1026", "Delayed"],
      ].map(([id, status]) => (
        <div key={id} className="flex items-center justify-between rounded-md bg-[#f5f3ee] px-2 py-1.5">
          <span className="text-[8px] font-semibold text-black/65">{id}</span>
          <span className="rounded-full bg-white px-1.5 py-0.5 text-[6.5px] font-semibold text-black/50">
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}

function PulseMock() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[7px] uppercase tracking-wide text-black/35">pulse</span>
        <span className="text-[7px] font-mono text-black/40">7 APIs</span>
      </div>
      <svg viewBox="0 0 120 40" className="mt-2 h-12 w-full">
        <polyline
          points="0,28 15,12 28,24 42,8 56,30 70,16 84,26 100,10 120,22"
          fill="none"
          stroke="#315ad2"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-1 flex gap-1.5">
        <span className="rounded-full bg-[#eef1fb] px-2 py-0.5 text-[6.5px] font-semibold text-[#3b56a8]">
          200 OK
        </span>
        <span className="rounded-full bg-[#e7f5ec] px-2 py-0.5 text-[6.5px] font-semibold text-[#2f7a4d]">
          normalized
        </span>
      </div>
    </div>
  );
}

export function CheckRow({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[11.5px] leading-relaxed text-[#5f5c55]">
      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#d8d2c5] bg-white">
        <Check size={9} strokeWidth={2.4} />
      </span>
      <span>{children}</span>
    </li>
  );
}

export type AccordionItem = {
  title: string;
  body: ReactNode;
  bullets?: string[];
  meta?: string;
};

export function Accordion({
  items,
  open,
  setOpen,
  className = "",
}: {
  items: AccordionItem[];
  open: number | null;
  setOpen: (index: number | null) => void;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.title} className="accordion-row px-4 py-3" data-open={isOpen}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="display text-[19px] leading-tight sm:text-[21px]">{item.title}</span>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#ded8cb] text-[15px] leading-none text-ink/60">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div className="accordion-body" data-open={isOpen}>
              <div>
                <div className="pt-2.5">
                  {item.meta ? <span className="pill mb-2">{item.meta}</span> : null}
                  <div className="text-[11.5px] leading-relaxed text-[#6d6a62]">{item.body}</div>
                  {item.bullets ? (
                    <ul className="mt-2.5 space-y-1">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-1.5 text-[10.5px] text-[#55534d]"
                        >
                          <Check size={10} className="text-ink/50" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {isOpen ? <div className="mt-3 h-[2px] w-full bg-[#111110]" /> : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
