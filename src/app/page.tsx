"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BookMarked,
  BookOpen,
  Check,
  ChevronDown,
  FileSearch,
  FileText,
  Flame,
  HelpCircle,
  Layers,
  Mail,
  Menu,
  Quote,
  Scale,
  Send,
  ShieldCheck,
  Target,
  Terminal,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ShineBorder } from "./components/ShineBorder";
import SubmitModal from "./components/SubmitModal";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.73.5.67 5.57.67 11.84c0 5.01 3.24 9.26 7.74 10.76.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.13-3.15.68-3.82-1.34-3.82-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.73 2.65 1.23 3.3.94.1-.73.39-1.23.71-1.51-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.04 0 4.36-2.65 5.31-5.17 5.59.4.35.76 1.03.76 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.65.79.54 4.49-1.5 7.73-5.75 7.73-10.76C23.33 5.57 18.27.5 12 .5z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Tiers", href: "#tiers" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "FAQ", href: "#faq" },
];

const DIM_LABELS = [
  "Textual",
  "Exegetical",
  "Theological",
  "Tradition",
  "Ambiguity",
  "Hallucination",
] as const;

const LEADERBOARD = [
  {
    model: "Claude Opus 4.6",
    vendor: "Anthropic",
    score: 871,
    max: 990,
    pct: 88.0,
    grade: "B",
    dims: [5, 5, 5, 4, 5, 5],
  },
  {
    model: "GPT-5.4",
    vendor: "OpenAI",
    score: 842,
    max: 990,
    pct: 85.1,
    grade: "B",
    dims: [5, 4, 5, 4, 4, 5],
  },
  {
    model: "Claude Sonnet 4.6",
    vendor: "Anthropic",
    score: 804,
    max: 990,
    pct: 81.2,
    grade: "B",
    dims: [4, 4, 4, 4, 4, 5],
  },
  {
    model: "Gemini 2.5 Pro",
    vendor: "Google",
    score: 778,
    max: 990,
    pct: 78.6,
    grade: "C",
    dims: [4, 4, 4, 3, 3, 5],
  },
  {
    model: "Llama 4 · 405B",
    vendor: "Meta",
    score: 706,
    max: 990,
    pct: 71.3,
    grade: "C",
    dims: [4, 3, 4, 3, 3, 4],
  },
  {
    model: "Mistral Large 3",
    vendor: "Mistral",
    score: 635,
    max: 990,
    pct: 64.1,
    grade: "D",
    dims: [3, 3, 3, 3, 2, 4],
  },
];

const SUBMIT_STEPS = [
  {
    n: "01",
    title: "Draft your question",
    body: "Write a question with a model answer. See the criteria below.",
    icon: FileText,
  },
  {
    n: "02",
    title: "Cite your sources",
    body: "Tell us what texts, fathers, confessions, or scholars you're drawing from.",
    icon: BookMarked,
  },
  {
    n: "03",
    title: "Name your tradition",
    body: "We want voices from across the body of Christ — tell us where you're coming from.",
    icon: Users,
  },
  {
    n: "04",
    title: "Email it to us",
    body: "We'll review it, calibrate for difficulty, and credit you in the manifest.",
    icon: Send,
  },
];

const SUBMIT_CRITERIA = [
  {
    title: "Cross-corpus synthesis",
    body: "If one proof-text can answer it, it's not hard enough. Pull across Law, Prophets, Gospels, Epistles.",
  },
  {
    title: "Two live interpretive options",
    body: "Faithful, informed readers should genuinely disagree. No settled questions. No rhetorical traps.",
  },
  {
    title: "2-3 traditions represented",
    body: "Patristic, medieval, Reformation, modern -- any combination, but characterized accurately.",
  },
  {
    title: "Genuine uncertainty named",
    body: "At least one part of the answer should resist clean resolution. Name what can't be settled.",
  },
];

const TIERS = [
  {
    name: "Core",
    tag: "Foundation",
    body: "Can the model get the basics right? Recall, citation, and straightforward theological reasoning. Sunday school through seminary level.",
  },
  {
    name: "Expert",
    tag: "Deeper knowledge",
    body: "Narrower topics, lesser-known figures, subtle interpretive traps. Confident but shallow models start to stumble here.",
  },
  {
    name: "Elite",
    tag: "Primary sources",
    body: "Precise citation of patristic texts, confessions, or original-language nuance. Small surface area. High penalty for getting it wrong.",
  },
  {
    name: "Extreme",
    tag: "Synthesis",
    body: "Longer-form answers where the model has to hold multiple traditions, manuscript issues, and genuinely contested conclusions in tension at once.",
  },
  {
    name: "Cultural",
    tag: "Courage",
    body: "The hardest questions to answer honestly. Culturally costly territory where the pressure to hedge or retreat into both-sidesism is strongest.",
  },
  {
    name: "Unified",
    tag: "Full evaluation",
    body: "All tiers run together in one session, with separate LLM-only and human-only scorecards published for the same answers.",
    featured: true,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Contribute",
    body: "We've drafted a seed set. Now we're opening it up to professors, pastors, scholars, and any Christian with a question worth asking.",
  },
  {
    n: "02",
    title: "4 independent LLM judges",
    body: "Every response is scored blind by 4 state-of-the-art LLMs. None of them know which model they're grading.",
  },
  {
    n: "03",
    title: "Human judges across traditions",
    body: "Scholars from different Christian traditions evaluate the same answers, also blind.",
  },
  {
    n: "04",
    title: "Separate scores",
    body: "LLM rankings and human rankings are published separately. You can compare them yourself.",
  },
  {
    n: "05",
    title: "Weighted rankings",
    body: "An optional combined score with transparent, community-agreed weights.",
  },
];

const DIMENSIONS = [
  {
    icon: BookOpen,
    name: "Textual Grounding",
    body: "Anchor your claims in Scripture. Draw across Law, Prophets, Gospels, Epistles. Don't cherry-pick isolated verses.",
  },
  {
    icon: FileSearch,
    name: "Exegetical Quality",
    body: "Genre, rhetorical situation, canonical context -- they all matter. Read the text on its own terms.",
  },
  {
    icon: Target,
    name: "Theological Precision",
    body: "Use doctrinal categories accurately. No anachronism, no conflating ideas that are actually distinct.",
  },
  {
    icon: Scale,
    name: "Tradition Fairness",
    body: "Represent multiple Christian traditions charitably. No strawmen. No flattening. No selective history.",
  },
  {
    icon: HelpCircle,
    name: "Ambiguity Handling",
    body: "If a question is genuinely contested, say so. Overconfidence is a vice, not a virtue.",
  },
  {
    icon: ShieldCheck,
    name: "Factual Integrity",
    body: "Citations have to be real. Quotes have to be genuine. Historical claims have to be accurate. One fabrication and you lose trust.",
  },
  {
    icon: Flame,
    name: "Boldness",
    body: "Answer the hard questions directly. No smoothing, no hedging, no retreat into the both-sidesism that LLMs love to default to.",
  },
];

const RED_FLAGS = [
  { k: "proof_texting", d: "Ripping verses out of context to back a predetermined conclusion." },
  { k: "tradition_flattening", d: "Treating distinct traditions as if they're basically the same." },
  { k: "overconfidence", d: "Stating contested conclusions as though they're settled." },
  { k: "fabricated_citation", d: "Citing a verse that doesn't actually say what you claim it says." },
  { k: "fabricated_historical_claim", d: "Making up quotes from fathers, councils, or confessions." },
  { k: "lexical_fallacy", d: "Building doctrine on a single Greek or Hebrew word without context." },
  { k: "ignored_counterargument", d: "Ducking the strongest objection to your position." },
  { k: "presentist_ideology", d: "Importing modern politics without theological distance." },
  { k: "building_doctrine_on_uncertain_text", d: "Treating an ambiguous text as if it's a clear proof-text." },
  { k: "category_confusion", d: "Mixing up theological categories that are actually distinct." },
  { k: "partisan_shortcut", d: "Picking a side without steelmanning the other one." },
  { k: "lazy_genealogy", d: "Drawing a line from an ancient tradition to a modern one without doing the work." },
];

const GRADES = [
  { g: "A", t: "≥ 90%", d: "Exceptional" },
  { g: "B", t: "≥ 80%", d: "Excellent" },
  { g: "C", t: "≥ 70%", d: "Good" },
  { g: "D", t: "≥ 60%", d: "Marginal" },
  { g: "E", t: "≥ 50%", d: "Poor" },
  { g: "F", t: "< 50%", d: "Failing" },
];

function Nav({ onOpenSubmit }: { onOpenSubmit: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#submit") {
      e.preventDefault();
      onOpenSubmit();
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-[color:var(--background)]/70" : ""
      }`}
    >
      <nav className="mx-auto max-w-[1200px] px-6 md:px-8 h-16 flex items-center justify-between">
        <a href="#" onClick={(e) => scrollTo(e, "#")} className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={36} height={26} className="" />
          <span className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-tight text-[color:var(--text-primary)]">
            BibleBench
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 font-[family-name:var(--font-instrument-sans)] text-sm">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent)] transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onOpenSubmit}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors duration-150"
          >
            <Send size={14} /> Submit
          </button>
        </div>
        <button
          className="md:hidden text-[color:var(--text-primary)]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[color:var(--background)]/90 backdrop-blur-xl"
        >
          <div className="px-6 py-4 flex flex-col gap-4 font-[family-name:var(--font-instrument-sans)]">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent)]"
              >
                {l.label}
              </a>
            ))}
            <button onClick={() => { onOpenSubmit(); setOpen(false); }} className="inline-flex items-center gap-2 text-[color:var(--text-primary)]">
              <Send size={14} /> Submit
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero({ onOpenSubmit }: { onOpenSubmit: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const bgX = useTransform(sx, (v) => `${v * 14}px`);
  const bgY = useTransform(sy, (v) => `${v * 14}px`);

  const rotX = useSpring(useTransform(my, (v) => v * -6), { stiffness: 80, damping: 18 });
  const rotY = useSpring(useTransform(mx, (v) => v * 6), { stiffness: 80, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const parScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate overflow-hidden lg:min-h-[100svh] flex items-center"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 dot-grid opacity-60"
        style={{ backgroundPositionX: bgX, backgroundPositionY: bgY }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.10), transparent 60%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color:var(--background)]" />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-8 w-full pt-24 pb-14 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-2 text-xs font-[family-name:var(--font-instrument-sans)] uppercase tracking-[0.18em] text-[color:var(--text-secondary)] mb-8"
          >
            <span
              className="inline-block size-1.5 rounded-full bg-white"
              style={{ boxShadow: "0 0 18px rgba(255,255,255,0.35)" }}
            />
            A Benchmark for Biblical Literacy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-primary)] leading-[1.05] tracking-tight pb-1"
            style={{ fontSize: "clamp(3rem, 6.5vw, 4.5rem)" }}
          >
            An AI benchmark scored by{" "}
            <span className="inline-block pr-1">people</span>, not just machines.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE_OUT_EXPO }}
            className="mt-8 max-w-xl text-lg text-[color:var(--text-secondary)] leading-relaxed"
          >
            Open to professors, pastors, scholars, and any Christian with a question
            worth asking. Every answer scored by 4 LLM judges <em>and</em> human scholars,
            blind. Both scores published separately.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE_OUT_EXPO }}
            className="mt-10 mb-6 lg:mb-0 flex flex-wrap gap-3 font-[family-name:var(--font-instrument-sans)]"
          >
            <button
              onClick={onOpenSubmit}
              className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 transition-colors"
            >
              Get involved
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#how"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-white transition-colors"
            >
              How it will work
            </a>
          </motion.div>
        </div>

        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE_OUT_EXPO }}
          style={{ perspective: 1200, y: parY }}
          className="relative w-full"
        >
          <motion.div
            style={{
              rotateX: rotX,
              rotateY: rotY,
              transformStyle: "preserve-3d",
              scale: parScale,
            }}
            className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full rounded-[28px] overflow-hidden ring-1 ring-white/15 shadow-[0_30px_120px_-20px_rgba(255,255,255,0.18)]"
          >
            <Image
              src="/hero.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover flip-y scale-110"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.18), transparent 60%)",
              }}
            />
            <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10 pr-6 sm:pr-8">
              <div className="flex items-center gap-3 text-[15px] font-[family-name:var(--font-instrument-sans)] uppercase tracking-[0.22em] text-white">
                <span className="inline-block size-2 rounded-full bg-white" />
                An Open Call
              </div>
              <p className="mt-6 font-[family-name:var(--font-instrument-serif)] text-white leading-[1.02] text-[clamp(2.25rem,3.8vw,3.6rem)] max-w-[20ch]">
                Pastors, theologians, Christians — help us write the hard questions.
              </p>
              <button
                onClick={onOpenSubmit}
                className="group mt-9 inline-flex items-center gap-3 text-lg font-[family-name:var(--font-instrument-sans)] text-white border-b border-white/60 pb-2 hover:border-white transition-colors"
              >
                See how to contribute
                <ArrowRight
                  size={22}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </motion.div>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.08), transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  body,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section id={id} ref={ref} className="relative py-14 sm:py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          {eyebrow && (
            <div className="text-xs font-[family-name:var(--font-instrument-sans)] uppercase tracking-[0.18em] text-[color:var(--accent)] mb-4">
              {eyebrow}
            </div>
          )}
          <h2
            className="font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-primary)] leading-[1.05]"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}
          >
            {title}
          </h2>
          {body && (
            <p className="mt-5 text-[color:var(--text-secondary)] text-lg leading-relaxed">{body}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Tiers() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  return (
    <Section
      id="tiers"
      eyebrow="Six Tiers"
      title={
        <>
          Levels of depth, not quotas. The size of each depends on{" "}
          <em className="not-italic underline decoration-white/40 underline-offset-[0.18em] decoration-[0.055em]">
            you
          </em>.
        </>
      }
      body="There's no fixed question count. Each tier grows as people submit material suited to that level. Here's how they differ."
    >
      <ul ref={ref} className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
        {TIERS.map((t, i) => (
          <motion.li
            key={t.name}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : i * 0.07, ease: EASE_OUT_EXPO }}
            className={`group rounded-xl border transition-colors ${
              t.featured
                ? "bg-white text-[color:var(--accent-ink)] border-white md:col-span-2 lg:col-span-6 p-7 md:p-10"
                : `bg-[color:var(--surface)] border-[color:var(--border)] hover:border-white p-6 md:p-7 flex flex-col ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`
            }`}
          >
            {t.featured ? (
              <>
                <div className="inline-flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-xs uppercase tracking-[0.18em] text-[color:var(--accent-ink)]/70 mb-3">
                  <Layers size={14} /> {t.name}
                </div>
                <h3 className="font-[family-name:var(--font-instrument-sans)] text-[color:var(--accent-ink)] font-medium text-lg">
                  {t.tag}
                </h3>
                <p className="mt-3 leading-relaxed text-[15px] text-[color:var(--accent-ink)]/85 max-w-[46ch]">
                  {t.body}
                </p>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <div className="inline-flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-xs uppercase tracking-[0.18em] text-[color:var(--text-secondary)]">
                    <Layers size={14} /> {t.name}
                  </div>
                </div>
                <h3 className="font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-primary)] font-medium text-lg">
                  {t.tag}
                </h3>
                <p className="mt-3 leading-relaxed text-[15px] text-[color:var(--text-secondary)]">
                  {t.body}
                </p>
              </>
            )}
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  return (
    <Section
      id="how"
      eyebrow="The Pipeline"
      title="Machines score. Humans score. Both matter."
      body="Here's how BibleBench works once it's fully live. We're not just ranking models. We want to see how machine judgment stacks up against peer review by actual biblical scholars."
    >
      <div ref={ref} className="relative">
        <div
          aria-hidden
          className="hidden lg:block absolute top-[22px] left-[22px] right-[22px] h-px"
          style={{ background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #ec4899)" }}
        />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : i * 0.08, ease: EASE_OUT_EXPO }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="relative z-10 inline-flex items-center justify-center size-11 rounded-full border border-[color:var(--border)] bg-[color:var(--background)] font-[family-name:var(--font-instrument-sans)] text-sm text-[color:var(--accent)]"
              >
                {s.n}
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-instrument-sans)] text-base md:text-lg text-[color:var(--text-primary)]">
                {s.title}
              </h3>
              <p className="mt-2 text-[color:var(--text-secondary)] leading-relaxed text-[15px]">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Dimensions() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  return (
    <Section
      id="dimensions"
      eyebrow="Seven Evaluation Principles"
      title={
        <>
          The rubric both judges will <em className="not-italic underline decoration-white/40 underline-offset-[0.18em] decoration-[0.055em]">share</em>.
        </>
      }
      body="LLM judges and human scholars grade answers against the same seven standards. A polished but shallow answer should score lower than a modest but careful one."
    >
      <ul ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
        {DIMENSIONS.map((d, i) => {
          const Icon = d.icon;
          const isLast = i === DIMENSIONS.length - 1;
          return isLast ? (
            <motion.li
              key={d.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : i * 0.06, ease: EASE_OUT_EXPO }}
              className="sm:col-span-2 lg:col-span-6"
            >
              <ShineBorder className="rounded-xl">
                <div className="p-5 md:p-6 flex flex-col">
                  <div className="flex items-center gap-3 min-w-0 mb-4">
                    <Icon size={18} className="text-[color:var(--accent)] shrink-0" aria-hidden="true" />
                    <h3 className="font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-primary)] text-base">
                      {d.name}
                    </h3>
                  </div>
                  <p className="text-[color:var(--text-secondary)] text-[15px] leading-relaxed">{d.body}</p>
                </div>
              </ShineBorder>
            </motion.li>
          ) : (
            <motion.li
              key={d.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : i * 0.06, ease: EASE_OUT_EXPO }}
              className="group rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 md:p-6 hover:border-white transition-colors flex flex-col lg:col-span-2"
            >
              <div className="flex items-center gap-3 min-w-0 mb-4">
                <Icon size={18} className="text-[color:var(--accent)] shrink-0" aria-hidden="true" />
                <h3 className="font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-primary)] text-base">
                  {d.name}
                </h3>
              </div>
              <p className="text-[color:var(--text-secondary)] text-[15px] leading-relaxed">{d.body}</p>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}

function Leaderboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <Section
      id="leaderboard"
      eyebrow="Preview Results"
      title={
        <>
          What early testing already <em className="not-italic underline decoration-white/40 underline-offset-[0.18em] decoration-[0.055em]">shows us</em>.
        </>
      }
      body="We've run early tests to prove the concept works. These numbers will change. The real benchmark grows as pastors, theologians, and scholars contribute the questions that only serious time in the text can produce."
    >
      <div
        ref={ref}
        className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden"
      >
        {/* header */}
        <div className="hidden md:grid grid-cols-[40px_1.4fr_auto_auto_1.2fr] gap-6 px-6 py-4 text-[11px] uppercase tracking-[0.18em] font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-muted)]">
          <div>#</div>
          <div>Model</div>
          <div className="text-right">Score</div>
          <div className="text-center">Grade</div>
          <div className="text-right">6-Dim Rubric Average</div>
        </div>

        <ul>
          {LEADERBOARD.map((m, i) => (
            <motion.li
              key={m.model}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT_EXPO }}
              className={`px-5 py-5 md:px-6 md:grid md:grid-cols-[40px_1.4fr_auto_auto_1.2fr] md:gap-6 md:items-center ${
                i === 0 ? "bg-white/[0.03]" : ""
              }`}
            >
              {/* Row 1 (mobile) / spread columns 1-3 (desktop) */}
              <div
                className="hidden md:block font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-secondary)]"
                style={{ fontSize: "1.25rem" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="flex items-baseline justify-between md:block md:min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="md:hidden font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-secondary)] shrink-0"
                    style={{ fontSize: "1.05rem" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i === 0 && <Trophy size={14} className="text-white shrink-0" />}
                  <span className="font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-primary)] truncate">
                    {m.model}
                  </span>
                </div>
                <div className="hidden md:block mt-0.5 text-[12px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                  {m.vendor}
                </div>
                {/* Score on the right, mobile only */}
                <div className="md:hidden text-right shrink-0 pl-3">
                  <div
                    className="font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-primary)]"
                    style={{ fontSize: "clamp(1.25rem, 4vw, 1.65rem)", lineHeight: 1 }}
                  >
                    {m.pct.toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-[color:var(--text-muted)] font-mono mt-1">
                    {m.score} / {m.max}
                  </div>
                </div>
              </div>

              {/* Vendor, mobile only */}
              <div className="md:hidden mt-1 text-[11px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                {m.vendor}
              </div>

              {/* Score column, desktop only */}
              <div className="hidden md:block md:text-right">
                <div
                  className="font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-primary)]"
                  style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", lineHeight: 1 }}
                >
                  {m.pct.toFixed(1)}%
                </div>
                <div className="text-[12px] text-[color:var(--text-muted)] font-mono mt-1">
                  {m.score} / {m.max}
                </div>
              </div>

              {/* Row 2 (mobile) — grade + bars */}
              <div className="mt-3 flex items-center justify-between gap-3 sm:gap-4 md:mt-0 md:contents">
                <div className="flex md:justify-center">
                  <span
                    className={`inline-flex items-center justify-center size-10 rounded-full font-[family-name:var(--font-instrument-serif)] text-lg ${
                      i === 0
                        ? "bg-white text-[color:var(--accent-ink)]"
                        : "border border-[color:var(--border)] text-[color:var(--text-primary)]"
                    }`}
                    aria-label={`Grade: ${m.grade}`}
                  >
                    {m.grade}
                  </span>
                </div>

                <div className="flex items-end gap-1 sm:gap-1.5 md:justify-end">
                  {m.dims.map((v, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div
                        className="relative w-4 sm:w-5 h-10 sm:h-12 rounded-sm bg-[color:var(--background)] border border-[color:var(--border)] overflow-hidden"
                        aria-hidden
                      >
                        <div
                          className="absolute inset-x-0 bottom-0 bg-white/90"
                          style={{ height: `${(v / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[color:var(--text-muted)]" aria-hidden>
                        {v}
                      </span>
                      <span className="sr-only">
                        {DIM_LABELS[idx]}: {v} of 5
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-[13px] text-[color:var(--text-secondary)] max-w-3xl leading-relaxed">
        These are early validation runs. Self-evaluation is off to avoid bias. The full public benchmark launches once we have enough contributors.
      </p>
    </Section>
  );
}

function Submit({ onOpenSubmit }: { onOpenSubmit: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="submit" className="relative py-14 sm:py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div ref={ref} className="grid gap-4 md:gap-5 lg:grid-cols-[3fr_2fr]">
          {/* CTA */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
          <ShineBorder className="rounded-2xl">
            <div className="p-6 md:p-10">
            <div className="text-[11px] font-[family-name:var(--font-instrument-sans)] uppercase tracking-[0.22em] text-[color:var(--text-secondary)] mb-5">
              An Open Call
            </div>
            <h2
              className="font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-primary)] leading-[1.05] max-w-[24ch]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}
            >
              Professors, pastors, scholars, and any Christian with a well-formed question.
            </h2>
            <p className="mt-5 max-w-[60ch] text-[color:var(--text-secondary)] text-[15px] md:text-base leading-relaxed">
              We started with a seed set to prove the concept works. Now we want questions
              from professors, seminary students, pastors, scholars, and anyone who has spent
              real time wrestling with the text. If your question fits the rubric, it's in --
              regardless of your title. Contributors are credited in the manifest.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 font-[family-name:var(--font-instrument-sans)]">
              <button
                onClick={onOpenSubmit}
                className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 transition-colors"
              >
                <Mail size={16} /> Start your submission
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#criteria"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-[color:var(--accent)] transition-colors"
              >
                Read the question spec
              </a>
            </div>
            </div>
          </ShineBorder>
          </motion.div>

          {/* How to submit */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.08, ease: EASE_OUT_EXPO }}
            className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8 hover:border-white transition-colors"
          >
            <h3 className="font-[family-name:var(--font-instrument-sans)] text-xs uppercase tracking-[0.22em] text-[color:var(--text-primary)] font-semibold mb-6">
              How to submit
            </h3>
            <ol className="grid gap-5">
              {SUBMIT_STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.n} className="flex items-start gap-4">
                    <span
                      className="inline-flex items-center justify-center size-9 shrink-0 rounded-full border border-[color:var(--border)] bg-[color:var(--background)]"
                      aria-hidden="true"
                    >
                      <Icon size={16} className="text-[color:var(--accent)]" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-primary)] font-medium text-[15px]">
                        {s.title}
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-[color:var(--text-secondary)]">
                        {s.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </motion.div>

          {/* Criteria */}
          <div id="criteria" className="lg:col-span-2 pt-2 scroll-mt-24">
            <h3 className="font-[family-name:var(--font-instrument-sans)] text-xs uppercase tracking-[0.22em] text-[color:var(--text-primary)] font-semibold mb-5 md:mb-6">
              What makes a good question
            </h3>
            <ul className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SUBMIT_CRITERIA.map((c, i) => (
                <motion.li
                  key={c.title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.16 + i * 0.06, ease: EASE_OUT_EXPO }}
                  className="relative rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 md:p-6 hover:border-white transition-colors"
                >
                  <div
                    className="absolute top-5 right-5 font-[family-name:var(--font-poppins)] text-[color:var(--text-muted)] text-sm font-medium"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-primary)] pr-8 font-semibold text-base">
                    {c.title}
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                    {c.body}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function RedFlags() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <Section
      id="redflags"
      eyebrow="Twelve Red Flags"
      title={
        <>
          Failure patterns we <em className="not-italic underline decoration-white/40 underline-offset-[0.18em] decoration-[0.055em]">specifically</em> hunt for.
        </>
      }
      body="The judge tallies each flag independently. One fabricated citation drops hallucination_avoidance to zero, no matter how polished the rest of the answer looks."
    >
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RED_FLAGS.map((f, i) => (
          <motion.div
            key={f.k}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.03, ease: EASE_OUT_EXPO }}
            className="group rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 hover:border-white/70 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-[color:var(--border)] group-hover:border-white/70 transition-colors">
                <AlertTriangle size={14} className="text-white" />
              </span>
              <div className="min-w-0">
                <code className="block font-mono text-[12px] sm:text-[13px] text-white break-words">
                  {f.k}
                </code>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--text-secondary)]">
                  {f.d}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Grades() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <Section
      eyebrow="Grading"
      title={
        <>
          Percentages map to letter grades. <em className="not-italic underline decoration-white/40 underline-offset-[0.18em] decoration-[0.055em]">Pass threshold: 18/30.</em>
        </>
      }
      body="Scores per question, per dimension, and per category roll up into a normalized percentage and a single letter grade."
    >
      <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {GRADES.map((g, i) => (
          <motion.div
            key={g.g}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT_EXPO }}
            className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 sm:p-5 md:p-6 flex flex-col items-start"
          >
            <div
              className="font-[family-name:var(--font-instrument-serif)] text-white"
              style={{ fontSize: "clamp(2rem, 2.6vw, 2.75rem)", lineHeight: 1 }}
            >
              {g.g}
            </div>
            <div className="mt-3 font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-primary)] text-sm">
              {g.t}
            </div>
            <div className="text-[12px] uppercase tracking-[0.16em] text-[color:var(--text-muted)] mt-1">
              {g.d}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

const FAQS = [
  {
    q: "Is this open to every Christian tradition?",
    a: "Yes. Catholic, Orthodox, Protestant, non-denominational -- all welcome. The question just has to be well-formed, grounded in the text, and fair to competing views. The rubric actually penalizes tradition-flattening, so the best way to protect your tradition is to write the question yourself.",
  },
  {
    q: "Who can submit a question?",
    a: "Anyone. Professors, seminary students, pastors, lay Christians. You don't need a PhD. You do need to show your work: biblical references, a model answer, and awareness of the major interpretive options.",
  },
  {
    q: "How are answers scored?",
    a: "Every answer is graded against seven principles: Textual Grounding, Exegetical Quality, Theological Precision, Tradition Fairness, Ambiguity Handling, Factual Integrity, and Boldness. Standard tiers are right/wrong or short-rubric. Extreme and Cultural tiers use a six-dimension rubric, 0-5 per dimension, 30 points max per question.",
  },
  {
    q: "Will I be credited for my submission?",
    a: "Yes, you'll be credited in the manifest. If you'd rather stay anonymous, that's fine too.",
  },
  {
    q: "What happens after I submit?",
    a: "We review it for clarity, fairness, and difficulty. If it fits a tier, it goes in the pool. We might write back with minor edits. Once the benchmark ships, your question is part of the permanent corpus.",
  },
];

const TIER_EXAMPLES = [
  {
    tier: "Core",
    tag: "Foundation",
    id: "FR-011",
    question: "Which Old Testament figure was sold into slavery by his brothers?",
    format: "Multiple choice · 4 options · 1 correct answer",
    reference: "Genesis 37:28",
    why: "Basic biblical literacy, no ambiguity. If a model misses this, it hasn't cleared even the Sunday-school bar.",
  },
  {
    tier: "Expert",
    tag: "Deeper knowledge",
    id: "XTR-001",
    question: "Explain the doctrine of the hypostatic union as affirmed by the Council of Chalcedon (451 AD). Identify the two Christological heresies the definition rejected: Nestorianism and Eutychianism (monophysitism).",
    format: "Free response · scored 0–3 · hard",
    reference: "Chalcedonian Definition (451 AD); Philippians 2:5-11",
    why: "Forces precision on a creedal boundary. Shallow models tend to conflate the heresies or garble the four Chalcedonian negations. Confident-but-surface answers start to crumble here.",
  },
  {
    tier: "Elite",
    tag: "Primary sources",
    id: "EL-001",
    question: "Analyze the textual corruption present in the Masoretic Text (MT) of 1 Samuel 13:1. Detail how the Septuagint (LXX) variants, the Lucianic recension, and the Hexapla handle this verse. Based on standard text-critical methodologies, what is the most critically sound reconstruction of the original Hebrew, and what are the downstream chronological implications for the reign of Saul?",
    format: "Free response · scored 0–3 · hard · original-language reasoning required",
    reference: "1 Samuel 13:1 (MT); LXX Codex Vaticanus; Origen's Hexapla; Acts 13:21",
    why: "You need firsthand knowledge of textual criticism here: specific manuscripts (Vaticanus, Lucianic recension), the asteriscus convention in the Hexapla, the external witness of Acts 13:21 and Josephus. Tiny surface area. One fabrication and you're caught.",
  },
  {
    tier: "Extreme",
    tag: "Synthesis",
    id: "Q10",
    question: "Compare Roman Catholic, Eastern Orthodox, Lutheran, Reformed, Baptist, and Churches of Christ views on baptismal efficacy. State each view in terms its best theologians would accept. Identify the strongest biblical arguments for each position and name the key theological pressure points that make reconciliation difficult.",
    format: "Free response · 6-dimension rubric (0–5 each) · 30 pts max · 8 required sections",
    reference: "Romans 6:1-14; 1 Corinthians 10:1-5; 12:12-27; Colossians 2:11-15; Council of Trent, Session 7; WCF 28; Thomas Aquinas, Summa IIIa q.66-69",
    why: "No single proof-text settles this. The model has to represent six traditions charitably, cite their best theologians, and name the real pressure points without caricature. This is where synthesis separates reasoning from retrieval.",
  },
  {
    tier: "Cultural",
    tag: "Courage",
    id: "XTR-016",
    question: "Does the Bible prohibit homosexual practice? Synthesize Genesis 19, Leviticus 18:22, Leviticus 20:13, Romans 1:26-27, 1 Corinthians 6:9-11, 1 Timothy 1:10, and Jude 7. Address the love-neighbor objection, the gospel-welcome objection, and the friendship-texts objection. State a clear yes/no conclusion.",
    format: "Free response · scored 0–10 · hard · moral theology",
    reference: "Genesis 1:27; 2:24; 19; Leviticus 18:22; 20:13; Romans 1:18-32; 1 Corinthians 6:9-11",
    why: "Culturally costly. The pressure to hedge or soften is enormous. A good answer has to engage the counter-objections head on, synthesize the canonical witness, and still land on a clear conclusion. No therapeutic smoothing.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <Section
      id="faq"
      eyebrow="Questions"
      title="What contributors usually want to know."
    >
      <div ref={ref} className="grid gap-4 md:gap-5">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT_EXPO }}
              className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-5 md:px-6 md:py-5 text-left"
              >
                <span className="font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-primary)] text-[15px] md:text-base">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[color:var(--text-secondary)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 md:px-6 md:pb-6 text-[color:var(--text-secondary)] text-[15px] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function TierExamples() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const current = TIER_EXAMPLES[active];
  const panelId = "tier-panel";

  const handleTabKeyDown = (e: React.KeyboardEvent, i: number) => {
    const count = TIER_EXAMPLES.length;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (i + 1) % count;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (i - 1 + count) % count;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = count - 1;
    } else {
      return;
    }
    setActive(next);
    document.getElementById(`tab-${TIER_EXAMPLES[next].id}`)?.focus();
  };

  return (
    <Section
      id="examples"
      eyebrow="Tier Examples"
      title="What the questions actually look like."
      body="One real question from each tier, with notes on format and why it works."
    >
      <div ref={ref} className="grid lg:grid-cols-[280px_1fr] gap-4 md:gap-5 overflow-hidden">
        <div className="relative min-w-0">
          <div
            role="tablist"
            aria-label="Tier examples"
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1"
          >
            {TIER_EXAMPLES.map((t, i) => {
              const selected = active === i;
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => handleTabKeyDown(e, i)}
                  className={`text-left shrink-0 rounded-xl border px-4 py-4 transition-colors focus-visible:rounded-xl ${
                    selected
                      ? "bg-white text-[color:var(--accent-ink)] border-white"
                      : "bg-[color:var(--surface)] border-[color:var(--border)] hover:border-white text-[color:var(--text-primary)]"
                  }`}
                >
                  <div className="text-[11px] uppercase tracking-[0.18em] font-[family-name:var(--font-instrument-sans)] opacity-70">
                    {t.tier}
                  </div>
                  <div className="font-[family-name:var(--font-instrument-sans)] font-medium text-[15px] mt-1">
                    {t.tag}
                  </div>
                </button>
              );
            })}
          </div>
          <div
            aria-hidden
            className="lg:hidden pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[color:var(--background)] to-transparent"
          />
        </div>

        <motion.div
          key={current.id}
          id={panelId}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          tabIndex={0}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6 md:p-8 min-w-0 overflow-hidden"
        >
          <div className="flex items-center gap-3 font-[family-name:var(--font-poppins)] text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-secondary)]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)]">
              {current.tier}
            </span>
            <span>ID: {current.id}</span>
          </div>

          <div className="mt-5 flex gap-3">
            <Quote size={18} className="shrink-0 text-[color:var(--text-muted)] mt-1.5" aria-hidden="true" />
            <p className="font-[family-name:var(--font-poppins)] font-medium text-[color:var(--text-primary)] text-base sm:text-lg md:text-xl leading-relaxed">
              {current.question}
            </p>
          </div>

          <dl className="mt-6 grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3 sm:p-4">
              <dt className="font-[family-name:var(--font-instrument-serif)] text-xl sm:text-[25px] text-[color:var(--text-primary)] mb-2">
                Format
              </dt>
              <dd className="font-[family-name:var(--font-poppins)] text-[13px] sm:text-[14px] text-[color:var(--text-secondary)] leading-relaxed break-words">
                {current.format}
              </dd>
            </div>
            <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] p-3 sm:p-4">
              <dt className="font-[family-name:var(--font-instrument-serif)] text-xl sm:text-[25px] text-[color:var(--text-primary)] mb-2">
                Key references
              </dt>
              <dd className="font-[family-name:var(--font-poppins)] text-[13px] sm:text-[14px] text-[color:var(--text-secondary)] leading-relaxed break-words">
                {current.reference}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-[family-name:var(--font-instrument-serif)] text-xl sm:text-[25px] text-[color:var(--text-primary)] mb-2">
                Why it is a good question
              </dt>
              <dd className="font-[family-name:var(--font-poppins)] text-[15px] text-[color:var(--text-secondary)] leading-relaxed">
                {current.why}
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </Section>
  );
}

function CTASection({ onOpenSubmit }: { onOpenSubmit: () => void }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const prefersReducedMotion = useReducedMotion();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (e) {
      console.error("Signup failed:", e);
    }
    setState("done");
  };
  return (
    <section className="relative py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <ShineBorder className="rounded-2xl" duration={6}>
          <div className="relative p-8 md:p-12 lg:p-14 overflow-hidden">
          <div aria-hidden className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
          <div className="relative">
            <h2
              className="font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-primary)] max-w-2xl leading-[1.05]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)" }}
            >
              Help us build this <em className="not-italic underline decoration-white/40 underline-offset-[0.18em] decoration-[0.055em]">together</em>.
            </h2>
            <p className="mt-4 max-w-lg text-[color:var(--text-secondary)] text-lg">
              Whether you're a professor, a pastor, or just someone who has spent too many
              hours on a hard passage, your question belongs here. Drop your email and we'll
              keep you posted as the benchmark takes shape.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl font-[family-name:var(--font-instrument-sans)]"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@research.org"
                aria-label="Email address"
                className="w-full h-14 rounded-full px-5 text-base bg-[color:var(--background)] border border-[color:var(--border)] outline-none focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]"
              />
              <button
                type="submit"
                disabled={state !== "idle"}
                className="group w-full sm:w-auto h-14 px-8 rounded-full bg-white text-[color:var(--accent-ink)] font-medium inline-flex items-center justify-center gap-2 hover:bg-zinc-200 disabled:opacity-80 transition-colors whitespace-nowrap"
              >
                {state === "done" ? (
                  <>
                    <Check size={16} /> We'll be in touch
                  </>
                ) : state === "loading" ? (
                  "…"
                ) : (
                  <>
                    Join the cohort <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
            <p role="status" className="sr-only">
              {state === "done" ? "Email submitted. We'll be in touch." : state === "loading" ? "Submitting…" : ""}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-[color:var(--text-muted)] text-sm">Already have a question?</span>
              <button
                onClick={onOpenSubmit}
                className="text-sm text-[color:var(--accent)] underline decoration-white/40 underline-offset-[0.18em] hover:decoration-white transition-colors"
              >
                Submit it now
              </button>
            </div>
          </div>
          </div>
          </ShineBorder>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ onOpenSubmit }: { onOpenSubmit: () => void }) {
  return (
    <footer>
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 min-h-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-[family-name:var(--font-instrument-sans)] text-sm">
        <div className="flex items-center gap-2 text-[color:var(--text-secondary)]">
          <Image src="/logo.png" alt="" width={26} height={19} className="" />
          <span className="font-[family-name:var(--font-instrument-serif)] text-lg tracking-tight text-[color:var(--text-primary)]">
            BibleBench
          </span>
          <span className="text-[color:var(--text-secondary)]">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[color:var(--text-secondary)]">
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#tiers" className="hover:text-white transition-colors">Tiers</a>
          <a href="#leaderboard" className="hover:text-white transition-colors">Leaderboard</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <button onClick={onOpenSubmit} className="hover:text-white transition-colors">Submit</button>
        </div>
      </div>
    </footer>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BibleBench",
  url: "https://biblebenchmark.com",
  description:
    "An AI benchmark scored by people, not just machines. Written by pastors, theologians, and scholars across traditions.",
};

export default function Home() {
  const [submitOpen, setSubmitOpen] = useState(false);
  return (
    <div className="flex-1 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav onOpenSubmit={() => setSubmitOpen(true)} />
      <main>
        <Hero onOpenSubmit={() => setSubmitOpen(true)} />
        <HowItWorks />
        <Tiers />
        <Submit onOpenSubmit={() => setSubmitOpen(true)} />
        <Dimensions />
        <FAQ />
        <TierExamples />
        <CTASection onOpenSubmit={() => setSubmitOpen(true)} />
      </main>
      <Footer onOpenSubmit={() => setSubmitOpen(true)} />
      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}
