"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  FileText,
  Layers,
  Mail,
  Send,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { id: 1, label: "Question", icon: FileText },
  { id: 2, label: "Details", icon: Users },
  { id: 3, label: "Review", icon: Check },
];

const TIERS = [
  { value: "", label: "Select a tier" },
  { value: "core", label: "Core — Foundation" },
  { value: "expert", label: "Expert — Deeper knowledge" },
  { value: "elite", label: "Elite — Primary sources" },
  { value: "extreme", label: "Extreme — Synthesis" },
  { value: "cultural", label: "Cultural — Courage" },
];

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

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-[1200px] px-6 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft
            size={16}
            className="text-[color:var(--text-secondary)] group-hover:text-[color:var(--accent)] transition-colors"
          />
          <span className="font-[family-name:var(--font-instrument-serif)] text-xl tracking-tight text-[color:var(--text-primary)]">
            BibleBench
          </span>
        </Link>
        <a
          href="https://github.com"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors duration-150 text-sm"
        >
          <GithubIcon /> GitHub
        </a>
      </nav>
    </header>
  );
}

function Progress({ step, total }: { step: number; total: number }) {
  const pct = (step / total) * 100;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = i + 1 === step;
          const done = i + 1 < step;
          return (
            <div key={s.id} className="flex items-center gap-3">
              <motion.div
                animate={{
                  backgroundColor: active || done ? "#ffffff" : "rgba(63,63,70,1)",
                  color: active || done ? "#09090b" : "#b4b4bd",
                }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="inline-flex items-center justify-center size-9 rounded-full text-sm"
              >
                {done ? <Check size={16} /> : <Icon size={16} />}
              </motion.div>
              <span
                className={`hidden sm:block font-[family-name:var(--font-instrument-sans)] text-sm ${
                  active ? "text-white" : done ? "text-[color:var(--text-secondary)]" : "text-[color:var(--text-muted)]"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-1 w-full rounded-full bg-[color:var(--surface-raised)] overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        />
      </div>
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
};

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    tier: "",
    name: "",
    email: "",
    tradition: "",
    references: "",
    rationale: "",
  });

  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = () => {
    setDirection(1);
    setSubmitted(true);
  };

  const canProceedStep1 = form.question.trim().length > 10 && form.tier;
  const canProceedStep2 = form.name.trim().length > 1 && form.email.includes("@");

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--background)] text-[color:var(--text-primary)]">
      <Header />

      <main className="flex-1 pt-28 pb-16 px-6 md:px-8">
        <div className="mx-auto max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <div className="mb-10">
              <div className="text-xs font-[family-name:var(--font-instrument-sans)] uppercase tracking-[0.18em] text-[color:var(--text-secondary)] mb-3">
                Contribute a question
              </div>
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-primary)] leading-[1.05] text-[clamp(1.9rem,3.6vw,2.75rem)]">
                Submit a question to the benchmark
              </h1>
              <p className="mt-4 text-[color:var(--text-secondary)] text-[15px] md:text-base leading-relaxed max-w-xl">
                We are building a corpus of rigorous, textually grounded questions. If your
                question fits the rubric, it belongs here — regardless of your title.
              </p>
              <Link
                href="/guide"
                className="mt-5 inline-flex items-center gap-2 text-[13px] font-[family-name:var(--font-instrument-sans)] text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors"
              >
                <FileText size={14} />
                Read the guide: What makes an ideal question
                <ArrowRight size={14} className="opacity-70" />
              </Link>
            </div>
          </motion.div>

          {!submitted && <Progress step={step} total={3} />}

          <div className="mt-10 relative min-h-[420px]">
            <AnimatePresence mode="wait" custom={direction}>
              {submitted ? (
                <motion.div
                  key="thanks"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 md:p-12"
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.5, ease: EASE_OUT_EXPO }}
                      className="inline-flex items-center justify-center size-16 rounded-full bg-white text-[color:var(--accent-ink)] mb-6"
                    >
                      <Check size={28} />
                    </motion.div>
                    <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-white">
                      Thank you for your submission
                    </h2>
                    <p className="mt-4 text-[color:var(--text-secondary)] text-[15px] md:text-base leading-relaxed max-w-md">
                      We have received your question and will review it for clarity, fairness,
                      and difficulty calibration. You will hear from us when it goes live or if
                      we need any follow-up.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-white transition-colors"
                      >
                        <ArrowLeft size={16} /> Back to home
                      </Link>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setStep(1);
                          setForm({
                            question: "",
                            answer: "",
                            tier: "",
                            name: "",
                            email: "",
                            tradition: "",
                            references: "",
                            rationale: "",
                          });
                        }}
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 transition-colors"
                      >
                        Submit another
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : step === 1 ? (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
                    <label className="block font-[family-name:var(--font-instrument-sans)] text-white mb-3">
                      Your question
                    </label>
                    <textarea
                      value={form.question}
                      onChange={(e) => update("question", e.target.value)}
                      placeholder="Write the question exactly as a model should receive it..."
                      className="w-full min-h-[140px] rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 py-3 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none resize-y"
                    />
                    <p className="mt-3 text-[13px] text-[color:var(--text-muted)] leading-relaxed">
                      A good question cannot be answered from a single proof-text. It should
                      pull across Law, Prophets, Gospels, and Epistles.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
                    <label className="block font-[family-name:var(--font-instrument-sans)] text-white mb-3">
                      Suggested answer or model response
                    </label>
                    <textarea
                      value={form.answer}
                      onChange={(e) => update("answer", e.target.value)}
                      placeholder="What would a strong answer look like?"
                      className="w-full min-h-[120px] rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 py-3 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none resize-y"
                    />
                  </div>

                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
                    <label className="block font-[family-name:var(--font-instrument-sans)] text-white mb-3">
                      Tier
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {TIERS.slice(1).map((t) => {
                        const selected = form.tier === t.value;
                        return (
                          <button
                            key={t.value}
                            onClick={() => update("tier", t.value)}
                            className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                              selected
                                ? "bg-white text-[color:var(--accent-ink)] border-white"
                                : "bg-[color:var(--background)] border-[color:var(--border)] hover:border-white text-[color:var(--text-primary)]"
                            }`}
                          >
                            <div className="text-[13px]">{t.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={next}
                      disabled={!canProceedStep1}
                      className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
                      <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-3">
                        <User size={16} className="text-[color:var(--text-secondary)]" />
                        Your name
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full h-11 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none"
                      />
                    </div>
                    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
                      <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-3">
                        <Mail size={16} className="text-[color:var(--text-secondary)]" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@research.org"
                        className="w-full h-11 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
                    <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-3">
                      <BookOpen size={16} className="text-[color:var(--text-secondary)]" />
                      Tradition / affiliation
                    </label>
                    <input
                      type="text"
                      value={form.tradition}
                      onChange={(e) => update("tradition", e.target.value)}
                      placeholder="e.g. Reformed Baptist, Eastern Orthodox, non-denominational..."
                      className="w-full h-11 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none"
                    />
                    <p className="mt-3 text-[13px] text-[color:var(--text-muted)]">
                      We want voices from across the body of Christ.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
                    <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-3">
                      <Layers size={16} className="text-[color:var(--text-secondary)]" />
                      Key references and sources
                    </label>
                    <textarea
                      value={form.references}
                      onChange={(e) => update("references", e.target.value)}
                      placeholder="Biblical texts, confessions, fathers, or scholars you draw from..."
                      className="w-full min-h-[100px] rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 py-3 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none resize-y"
                    />
                  </div>

                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
                    <label className="block font-[family-name:var(--font-instrument-sans)] text-white mb-3">
                      Why is this a good question?
                    </label>
                    <textarea
                      value={form.rationale}
                      onChange={(e) => update("rationale", e.target.value)}
                      placeholder="Explain what makes it fair, difficult, and textually grounded..."
                      className="w-full min-h-[100px] rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 py-3 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none resize-y"
                    />
                    <p className="mt-3 text-[13px] text-[color:var(--text-muted)]">
                      Does it force synthesis across corpora? Name genuine uncertainty? Represent
                      multiple traditions charitably?
                    </p>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      onClick={back}
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-white transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      onClick={next}
                      disabled={!canProceedStep2}
                      className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Review <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8">
                    <h3 className="font-[family-name:var(--font-instrument-sans)] text-white text-lg mb-6">
                      Review your submission
                    </h3>
                    <div className="space-y-5">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1">
                          Question
                        </div>
                        <p className="text-[15px] text-[color:var(--text-primary)] leading-relaxed">
                          {form.question}
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1">
                            Tier
                          </div>
                          <p className="text-[15px] text-[color:var(--text-primary)]">
                            {TIERS.find((t) => t.value === form.tier)?.label}
                          </p>
                        </div>
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1">
                            Submitted by
                          </div>
                          <p className="text-[15px] text-[color:var(--text-primary)]">
                            {form.name} {form.tradition && <span className="text-[color:var(--text-secondary)]">· {form.tradition}</span>}
                          </p>
                        </div>
                      </div>
                      {form.answer && (
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1">
                            Suggested answer
                          </div>
                          <p className="text-[15px] text-[color:var(--text-secondary)] leading-relaxed whitespace-pre-line">
                            {form.answer}
                          </p>
                        </div>
                      )}
                      {form.references && (
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1">
                            References
                          </div>
                          <p className="text-[15px] text-[color:var(--text-secondary)] leading-relaxed">
                            {form.references}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      onClick={back}
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-white transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 transition-colors"
                    >
                      <Send size={16} /> Submit question
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="px-6 md:px-8 py-6">
        <div className="mx-auto max-w-[760px] flex items-center justify-between text-sm text-[color:var(--text-secondary)] font-[family-name:var(--font-instrument-sans)]">
          <span>BibleBench</span>
          <Link href="/" className="hover:text-white transition-colors">
            Return home
          </Link>
        </div>
      </footer>
    </div>
  );
}
