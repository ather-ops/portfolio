import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Send, SkipForward, Sparkles, X } from "lucide-react";
import uriAvatar from "../assets/uri-avatar.jpg";
import { askUri, generateIntro, type UriReply } from "../uri";

type Phase = "idle" | "thinking" | "speaking";

type Message = {
 id: string;
 role: "user" | "uri";
 text: string;
 shown: number;
 scope?: string;
 chips?: string[];
 link?: { label: string; href: string };
 links?: { label: string; href: string }[];
};

const linksFor = (m: Message) =>
 m.links?.length ? m.links : m.link ? [m.link] : [];

const newId = () =>
 typeof crypto !== "undefined" && "randomUUID" in crypto
 ? crypto.randomUUID()
 : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const CHIP_SEEDS = [
 "What is his best project?",
 "Send me the app links",
 "What is Atherva Automations?",
 "Which apps are live?",
];

export default function Uri() {
 const [open, setOpen] = useState(false);
 const [messages, setMessages] = useState<Message[]>([]);
 const [phase, setPhase] = useState<Phase>("idle");
 const [lights, setLights] = useState(false);
 const [input, setInput] = useState("");
 const [hint, setHint] = useState(false);
 const [visited, setVisited] = useState(false);

 const timers = useRef<number[]>([]);
 const scrollRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLInputElement>(null);
 const phaseRef = useRef<Phase>("idle");
 const busyRef = useRef(false);

 const clearTimers = () => {
 timers.current.forEach((t) => window.clearTimeout(t));
 timers.current = [];
 };

 const later = (fn: () => void, ms: number) => {
 const t = window.setTimeout(fn, ms);
 timers.current.push(t);
 return t;
 };

 const finishStream = useCallback(() => {
 clearTimers();
 setMessages((prev) =>
 prev.map((m) => (m.shown < m.text.length ? { ...m, shown: m.text.length } : m))
 );
 busyRef.current = false;
 phaseRef.current = "idle";
 setPhase("idle");
 later(() => setLights(false), 1200);
 }, []);

 const streamReply = useCallback(
 (reply: UriReply) => {
 const id = newId();
 setMessages((prev) => [
 ...prev,
 {
 id,
 role: "uri",
 text: reply.text,
 shown: 0,
 scope: reply.scope,
 chips: reply.chips,
 link: reply.link,
 links: reply.links,
 },
 ]);
 busyRef.current = true;
 phaseRef.current = "speaking";
 setPhase("speaking");
 setLights(true);

 let index = 0;
 const step = () => {
 index = Math.min(index + 5, reply.text.length);
 setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, shown: index } : m)));
 if (index < reply.text.length) {
 later(step, 12);
 } else {
 busyRef.current = false;
 phaseRef.current = "idle";
 setPhase("idle");
 later(() => setLights(false), 1400);
 }
 };
 later(step, 220);
 },
 []
 );

 const ask = useCallback(
 (raw: string) => {
 const question = raw.trim();
 if (!question) return;

 // Interrupt any answer in flight.
 clearTimers();
 setMessages((prev) =>
 prev
 .map((m) => (m.shown < m.text.length ? { ...m, shown: m.text.length } : m))
 .concat({ id: newId(), role: "user", text: question, shown: question.length })
 );
 busyRef.current = true;
 phaseRef.current = "thinking";
 setPhase("thinking");
 setLights(true);
 setInput("");

 const reply = askUri(question);
 later(() => streamReply(reply), 380 + Math.random() * 320);
 },
 [streamReply]
 );

 const openPanel = useCallback(() => {
 setOpen(true);
 setHint(false);
 setVisited(true);
 try {
 sessionStorage.setItem("uri-visited", "1");
 } catch {
 /* ignore */
 }
 setMessages((prev) => {
 if (prev.length) return prev;
 const intro = generateIntro();
 return [
 {
 id: newId(),
 role: "uri" as const,
 text: intro.text,
 shown: intro.text.length,
 scope: intro.scope,
 chips: intro.chips,
 },
 ];
 });
 }, []);

 const askRef = useRef(ask);
 askRef.current = ask;
 const openRef = useRef(openPanel);
 openRef.current = openPanel;

 useEffect(() => {
 try {
 if (sessionStorage.getItem("uri-visited")) setVisited(true);
 } catch {
 /* ignore */
 }
 const onOpen = () => openRef.current();
 const onAsk = (event: Event) => {
 const detail = (event as CustomEvent<string>).detail;
 openRef.current();
 if (typeof detail === "string" && detail.trim()) {
 later(() => askRef.current(detail), 260);
 }
 };
 window.addEventListener("uri:open", onOpen);
 window.addEventListener("uri:ask", onAsk as EventListener);
 return () => {
 window.removeEventListener("uri:open", onOpen);
 window.removeEventListener("uri:ask", onAsk as EventListener);
 };
 }, []);

 // First-visit nudge, only for visitors who never opened URI.
 useEffect(() => {
 if (visited) return;
 const t = window.setTimeout(() => setHint(true), 14000);
 return () => window.clearTimeout(t);
 }, [visited]);

 useEffect(() => {
 if (!open) return;
 const el = scrollRef.current;
 if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
 }, [messages, open, phase]);

 useEffect(() => {
 if (open) inputRef.current?.focus();
 }, [open]);

 useEffect(() => {
 const onKey = (e: KeyboardEvent) => {
 if (e.key === "Escape") setOpen(false);
 };
 window.addEventListener("keydown", onKey);
 return () => window.removeEventListener("keydown", onKey);
 }, []);

 useEffect(() => () => clearTimers(), []);

 const lastUri = [...messages].reverse().find((m) => m.role === "uri");
 const chips = lastUri?.chips?.length ? lastUri.chips : CHIP_SEEDS;
 const busy = phase !== "idle";

 const onSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 ask(input);
 };

 const ringState: Phase = phase;

 return (
 <>
 {/* ── Launcher ─────────────────────────────────────────────── */}
 <div className="fixed bottom-5 right-4 z-[70] hidden flex-col items-end gap-2 min-[1360px]:flex sm:bottom-6 sm:right-6">
 <AnimatePresence>
 {hint && !open && (
 <motion.button
 type="button"
 onClick={openPanel}
 initial={{ opacity: 0, y: 8, scale: 0.95 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 6, scale: 0.96 }}
 className="uri-trigger mr-1 max-w-[230px] rounded-2xl rounded-br-md border border-white/70 bg-white/90 px-4 py-3 text-left text-xs font-medium leading-snug text-ink shadow-[0_16px_40px_rgba(31,45,71,0.16)] backdrop-blur-xl"
 >
 <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5c85d6]">
 <Sparkles size={10} /> URI
 </span>
 Hi — I'm URI. Ask me anything about Ather Sama.
 </motion.button>
 )}
 </AnimatePresence>

 <div className="relative">
 <button
 type="button"
 onClick={() => (open ? setOpen(false) : openPanel())}
 aria-expanded={open}
 aria-label={open ? "Close URI, the assistant for Ather Sama" : "Open URI, the assistant for Ather Sama"}
 data-state={ringState}
 className="uri-orb uri-trigger group grid h-16 w-16 place-items-center rounded-full bg-white/60 p-1 shadow-[0_18px_40px_rgba(31,45,71,0.22)] backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95"
 >
 <span className="uri-ping" aria-hidden />
 <span className="uri-ping uri-ping--late" aria-hidden />
 <span className="uri-orb__halo" aria-hidden />
 <span className="uri-orb__ring" aria-hidden />
 <img
 src={uriAvatar}
 alt="URI, the assistant for Ather Sama"
 className="relative h-full w-full rounded-full object-cover"
 draggable={false}
 />
 <AnimatePresence mode="wait" initial={false}>
 <motion.span
 key={open ? "close" : "spark"}
 initial={{ scale: 0.6, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ scale: 0.6, opacity: 0 }}
 transition={{ duration: 0.15 }}
 className="absolute -bottom-0.5 -right-0.5 grid h-6 w-6 place-items-center rounded-full border border-white/70 bg-ink text-lime shadow-md"
 >
 {open ? <X size={12} /> : <Sparkles size={11} />}
 </motion.span>
 </AnimatePresence>
 {busy && (
 <span className="absolute -left-0.5 -top-0.5 h-3 w-3 animate-ping rounded-full bg-lime" />
 )}
 </button>
 </div>
 </div>

 {/* ── Panel ────────────────────────────────────────────────── */}
 <AnimatePresence>
 {open && (
 <motion.div
 initial={{ opacity: 0, y: 18, scale: 0.97 }}
 animate={{ opacity: 1, y: 0, scale: 1 }}
 exit={{ opacity: 0, y: 14, scale: 0.98 }}
 transition={{ type: "spring", stiffness: 320, damping: 28 }}
 className="fixed inset-x-3 bottom-24 z-[75] sm:inset-x-auto sm:bottom-28 sm:right-6 sm:w-[400px]"
 >
 <div
 className="uri-frame"
 data-state={ringState}
 role="dialog"
 aria-label="URI, the assistant for Ather Sama"
 >
 <span className="uri-frame__glow" aria-hidden />
 <span className="uri-frame__ring" aria-hidden />
 <span className="uri-lights" data-on={lights} aria-hidden>
 <span />
 <span />
 <span />
 <span />
 <span />
 <span />
 </span>

 <div className="relative z-10 overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-[0_28px_70px_rgba(23,42,74,0.24)] backdrop-blur-2xl">
 {/* header */}
 <div className="relative flex items-center gap-3 border-b border-ink/5 bg-gradient-to-r from-[#eef4ff] via-white to-[#f3fbe9] px-4 py-3.5">
 <div className="relative h-11 w-11 shrink-0">
 <span className="uri-orb__halo" aria-hidden />
 <img
 src={uriAvatar}
 alt=""
 className="relative h-11 w-11 rounded-full object-cover ring-2 ring-white"
 draggable={false}
 />
 <span
 className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
 phase === "idle" ? "bg-emerald-400" : "bg-lime"
 }`}
 />
 </div>
 <div className="min-w-0 flex-1">
 <p className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink">
 URI
 <span className="rounded-full bg-ink/5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/45">
 Ather Sama
 </span>
 </p>
 <p className="truncate text-[11px] font-medium text-ink/50">
 {phase === "thinking"
 ? "Searching the knowledge base…"
 : phase === "speaking"
 ? "Answering from the knowledge base…"
 : "Ask about Ather Sama"}
 </p>
 </div>
 <button
 type="button"
 onClick={() => setOpen(false)}
 aria-label="Close URI"
 className="grid h-8 w-8 place-items-center rounded-full bg-white/70 text-ink/60 transition hover:bg-white hover:text-ink"
 >
 <X size={15} />
 </button>
 </div>

 {/* messages */}
 <div
 ref={scrollRef}
 className="uri-scroll max-h-[min(52vh,420px)] min-h-[260px] space-y-3 overflow-y-auto px-3.5 py-4"
 aria-live="polite"
 >
 {messages.map((m) =>
 m.role === "user" ? (
 <div key={m.id} className="flex justify-end">
 <p className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-[13px] font-medium leading-relaxed text-white shadow-sm">
 {m.text}
 </p>
 </div>
 ) : (
 <div key={m.id} className="flex items-start gap-2.5">
 <img
 src={uriAvatar}
 alt=""
 className="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-white"
 draggable={false}
 />
 <div className="max-w-[88%] rounded-2xl rounded-tl-md border border-ink/5 bg-white px-3.5 py-2.5 shadow-[0_6px_18px_rgba(31,45,71,0.06)]">
 {m.scope && (
 <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#5c85d6]">
 {m.scope}
 </p>
 )}
 <p className="whitespace-pre-line text-[13px] leading-relaxed text-ink/80">
 {m.text.slice(0, m.shown)}
 {m.shown < m.text.length && (
 <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-[#5c85d6]" />
 )}
 </p>
 {m.shown >= m.text.length && linksFor(m).length > 0 && (
 <div className="mt-2 flex flex-wrap gap-1.5">
 {linksFor(m).slice(0, 4).map((l) => (
 <a
 key={l.href + l.label}
 href={l.href}
 target={l.href.startsWith("#") || l.href.startsWith("mailto:") ? undefined : "_blank"}
 rel={l.href.startsWith("#") || l.href.startsWith("mailto:") ? undefined : "noreferrer"}
 onClick={() => l.href.startsWith("#") && setOpen(false)}
 className="inline-flex items-center gap-1 rounded-full bg-[#eef4ff] px-2.5 py-1 text-[11px] font-semibold text-[#3f6fc4] transition hover:bg-[#e2ecff]"
 >
 {l.label}
 <ArrowUpRight size={11} />
 </a>
 ))}
 </div>
 )}
 </div>
 </div>
 )
 )}

 {phase === "thinking" && (
 <div className="flex items-center gap-2.5">
 <img
 src={uriAvatar}
 alt=""
 className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-white"
 draggable={false}
 />
 <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-ink/5 bg-white px-3.5 py-3 shadow-sm">
 <span className="uri-dot h-1.5 w-1.5 rounded-full bg-[#5c85d6]" />
 <span className="uri-dot h-1.5 w-1.5 rounded-full bg-[#7ea6f2]" />
 <span className="uri-dot h-1.5 w-1.5 rounded-full bg-lime-deep" />
 </div>
 </div>
 )}
 </div>

 {/* suggestions */}
 <div className="border-t border-ink/5 px-3 pb-2 pt-2.5">
 <div className="flex flex-wrap gap-1.5 pb-1">
 {chips.slice(0, 4).map((chip) => (
 <button
 key={chip}
 type="button"
 onClick={() => ask(chip)}
 disabled={phase === "thinking"}
 className="shrink-0 rounded-full border border-ink/8 bg-white/80 px-2.5 py-1.5 text-[11px] font-semibold text-ink/65 transition hover:border-[#7ea6f2]/50 hover:bg-[#eef4ff] hover:text-ink disabled:opacity-40"
 >
 {chip}
 </button>
 ))}
 </div>

 <form onSubmit={onSubmit} className="mt-1.5 flex items-center gap-2">
 <div className="flex flex-1 items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-2 transition focus-within:border-[#7ea6f2]/60 focus-within:shadow-[0_0_0_3px_rgba(126,166,242,0.14)]">
 <input
 ref={inputRef}
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder={busy ? "URI is answering…" : "Ask about Ather Sama…"}
 aria-label="Ask URI about Ather Sama"
 className="uri-input w-full bg-transparent text-[13px] text-ink placeholder:text-ink/35"
 />
 </div>
 {busy ? (
 <button
 type="button"
 onClick={finishStream}
 className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/10 bg-white text-[10px] font-bold uppercase tracking-wider text-ink/50 transition hover:text-ink"
 title="Skip typing"
 aria-label="Skip typing"
 >
 ⏭
 </button>
 ) : (
 <button
 type="submit"
 disabled={!input.trim()}
 aria-label="Send question"
 className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-lime transition hover:scale-105 disabled:scale-100 disabled:bg-ink/15 disabled:text-white/60"
 >
 <Send size={14} />
 </button>
 )}
 </form>
 <p className="mt-1.5 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-ink/30">
 Answers about Ather Sama · runs locally
 </p>
 </div>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
}
