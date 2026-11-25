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
 className="uri-hint uri-trigger mr-1 max-w-[230px] rounded-2xl rounded-br-md px-4 py-3 text-left text-[11px] font-medium leading-snug"
 >
 <span className="uri-hint-kicker mb-1 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.16em]">
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
  className="uri-pill uri-trigger group flex items-center gap-2 rounded-full py-1.5 pl-4 pr-1.5 text-[11.5px] font-medium transition active:scale-[0.98]"
 >
  <span>Ask URI</span>
  <span className="uri-pill-orb relative grid h-8 w-8 place-items-center rounded-full">
   {open ? <X size={12} /> : <Sparkles size={12} />}
   {busy && (
    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-ping rounded-full bg-[#6b4eff]" />
   )}
  </span>
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

 <div className="uri-shell relative z-10 overflow-hidden rounded-[28px] backdrop-blur-2xl">
 {/* header */}
 <div className="uri-head relative flex items-center gap-3 px-4 py-3.5">
 <div className="relative h-11 w-11 shrink-0">
 <span className="uri-orb__halo" aria-hidden />
 <img
 src={uriAvatar}
 alt=""
 className="uri-avatar relative h-11 w-11 rounded-full object-cover"
 draggable={false}
 />
 <span
 className={`uri-avatar-badge absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ${
 phase === "idle" ? "bg-emerald-400" : "bg-lime"
 }`}
 />
 </div>
 <div className="min-w-0 flex-1">
 <p className="uri-title flex items-center gap-1.5 text-sm font-bold tracking-tight">
 URI
 <span className="uri-chip rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]">
 Ather Sama
 </span>
 </p>
 <p className="uri-sub truncate text-[11px] font-medium">
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
 className="uri-icon-btn grid h-8 w-8 place-items-center rounded-full transition"
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
 <p className="uri-bubble-user max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13px] font-medium leading-relaxed">
 {m.text}
 </p>
 </div>
 ) : (
 <div key={m.id} className="flex items-start gap-2.5">
 <img
 src={uriAvatar}
 alt=""
 className="uri-avatar-ring mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover"
 draggable={false}
 />
 <div className="uri-bubble uri-bot max-w-[88%] rounded-2xl rounded-tl-md px-3.5 py-2.5">
 {m.scope && (
 <p className="uri-scope mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em]">
 {m.scope}
 </p>
 )}
 <p className="uri-text whitespace-pre-line text-[13px] leading-relaxed">
 {m.text.slice(0, m.shown)}
 {m.shown < m.text.length && (
 <span className="uri-caret ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse" />
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
 className="uri-link inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition"
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
 className="uri-avatar-ring h-7 w-7 shrink-0 rounded-full object-cover"
 draggable={false}
 />
 <div className="uri-bubble uri-bot flex items-center gap-1 rounded-2xl rounded-tl-md px-3.5 py-3">
 <span className="uri-dot h-1.5 w-1.5 rounded-full bg-[#5c85d6]" />
 <span className="uri-dot h-1.5 w-1.5 rounded-full bg-[#7ea6f2]" />
 <span className="uri-dot h-1.5 w-1.5 rounded-full bg-lime-deep" />
 </div>
 </div>
 )}
 </div>

 {/* suggestions */}
 <div className="uri-composer px-3 pb-2 pt-2.5">
 <div className="flex flex-wrap gap-1.5 pb-1">
 {chips.slice(0, 4).map((chip) => (
 <button
 key={chip}
 type="button"
 onClick={() => ask(chip)}
 disabled={phase === "thinking"}
 className="uri-suggest shrink-0 rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition disabled:opacity-40"
 >
 {chip}
 </button>
 ))}
 </div>

 <form onSubmit={onSubmit} className="mt-1.5 flex items-center gap-2">
 <div className="uri-field flex flex-1 items-center gap-2 rounded-full px-3.5 py-2 transition">
 <input
 ref={inputRef}
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder={busy ? "URI is answering…" : "Ask about Ather Sama…"}
 aria-label="Ask URI about Ather Sama"
 className="uri-input w-full bg-transparent text-[13px]"
 />
 </div>
 {busy ? (
 <button
 type="button"
 onClick={finishStream}
 className="uri-skip grid h-9 w-9 shrink-0 place-items-center rounded-full text-[10px] font-bold uppercase tracking-wider transition"
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
 className="uri-send grid h-9 w-9 shrink-0 place-items-center rounded-full transition hover:scale-105 disabled:scale-100"
 >
 <Send size={14} />
 </button>
 )}
 </form>
 <p className="uri-note mt-1.5 text-center text-[9px] font-medium uppercase tracking-[0.14em]">
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
