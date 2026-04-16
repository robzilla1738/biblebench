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
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { id: 1, label: "Question", desc: "The question, answer, and tier" },
  { id: 2, label: "Details", desc: "Your info and references" },
  { id: 3, label: "Review", desc: "Confirm and submit" },
];

const TIERS = [
  { value: "core", label: "Core", desc: "Foundation" },
  { value: "expert", label: "Expert", desc: "Deeper knowledge" },
  { value: "elite", label: "Elite", desc: "Primary sources" },
  { value: "extreme", label: "Extreme", desc: "Synthesis" },
  { value: "cultural", label: "Cultural", desc: "Courage" },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const containerVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 16,
    transition: { duration: 0.25, ease: EASE_OUT_EXPO },
  },
};

const stepContainerVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir < 0 ? 60 : -60,
    filter: "blur(6px)",
    transition: { duration: 0.35, ease: EASE_OUT_EXPO },
  }),
};

const itemStagger = {
  hidden: { transition: { staggerChildren: 0.05 } },
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
};

export default function SubmitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    setDirection(1);
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (e) {
      console.error("Submit failed:", e);
    }
    setSubmitted(true);
  };

  const reset = () => {
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
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const canProceedStep1 = form.question.trim().length > 10 && form.tier;
  const canProceedStep2 = form.name.trim().length > 1 && form.email.includes("@");

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[1000px] h-[92vh] sm:h-[85vh] min-h-[640px] rounded-3xl bg-[color:var(--surface)] border border-[color:var(--border)] shadow-2xl overflow-hidden flex flex-col sm:flex-row"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.04), transparent 50%)",
              }}
            />

            <aside className="relative sm:w-64 sm:border-r border-b sm:border-b-0 border-[color:var(--border)] bg-[color:var(--background)]/40 p-6 sm:p-8 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4 shrink-0">
              <div className="hidden sm:block">
                <div className="text-xs font-[family-name:var(--font-instrument-sans)] uppercase tracking-[0.18em] text-[color:var(--text-secondary)] mb-6">
                  Contribute
                </div>
                <div className="space-y-5">
                  {STEPS.map((s, i) => {
                    const active = i + 1 === step && !submitted;
                    const done = i + 1 < step && !submitted;
                    return (
                      <div key={s.id} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 size-2 rounded-full transition-colors ${
                            active || done ? "bg-white" : "bg-[color:var(--border)]"
                          }`}
                        />
                        <div>
                          <div
                            className={`text-sm font-medium transition-colors ${
                              active || done ? "text-white" : "text-[color:var(--text-muted)]"
                            }`}
                          >
                            {s.label}
                          </div>
                          <div className="text-[12px] text-[color:var(--text-muted)] mt-0.5">
                            {s.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="sm:hidden flex items-center gap-4">
                {STEPS.map((s, i) => {
                  const done = i + 1 < step && !submitted;
                  const active = i + 1 === step && !submitted;
                  return (
                    <div key={s.id} className="flex items-center gap-2">
                      <div
                        className={`size-2 rounded-full ${active || done ? "bg-white" : "bg-[color:var(--border)]"}`}
                      />
                      <span className={`text-xs ${active || done ? "text-white" : "text-[color:var(--text-muted)]"}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="hidden sm:block mt-auto space-y-5">
                <a
                  href="/guide"
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 hover:border-white transition-colors"
                >
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-secondary)] group-hover:text-white transition-colors">
                    <FileText size={12} /> Guide
                  </div>
                  <div className="mt-2 text-[13px] leading-snug text-[color:var(--text-primary)] font-[family-name:var(--font-instrument-sans)]">
                    What makes an ideal question
                  </div>
                  <div className="mt-1 text-[11px] text-[color:var(--text-muted)]">
                    Read before submitting →
                  </div>
                </a>
                <button
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)] hover:text-white transition-colors"
                >
                  <X size={16} /> Close
                </button>
              </div>

              <button
                onClick={handleClose}
                className="sm:hidden inline-flex items-center justify-center size-9 rounded-full border border-[color:var(--border)] text-[color:var(--text-secondary)]"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </aside>

            <div className="relative flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto p-6 sm:p-10">
                <div className="max-w-xl mx-auto relative min-h-[520px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    {submitted ? (
                      <motion.div
                        key="thanks"
                        custom={direction}
                        variants={stepContainerVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="min-h-[520px] flex flex-col items-center justify-center text-center"
                      >
                        <motion.div
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
                          className="relative inline-flex items-center justify-center size-20 rounded-full bg-white text-[color:var(--accent-ink)] mb-8"
                        >
                          <Check size={32} />
                          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                        </motion.div>
                        <h2 className="font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl text-white">
                          Thank you
                        </h2>
                        <p className="mt-4 text-[color:var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-md">
                          We have received your question and will review it for clarity, fairness,
                          and difficulty calibration. You will hear from us when it goes live or if
                          we need any follow-up.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                          <button
                            onClick={handleClose}
                            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-white transition-colors"
                          >
                            Close
                          </button>
                          <button
                            onClick={reset}
                            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 transition-colors"
                          >
                            Submit another
                          </button>
                        </div>
                      </motion.div>
                    ) : step === 1 ? (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={stepContainerVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="min-h-[520px]"
                      >
                        <motion.div
                          variants={itemStagger}
                          initial="hidden"
                          animate="visible"
                          className="space-y-7"
                        >
                          <motion.div variants={itemVariants} className="sm:hidden">
                            <a
                              href="/guide"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-[13px] text-[color:var(--text-primary)] hover:text-white transition-colors"
                            >
                              <FileText size={14} />
                              Read the guide: What makes an ideal question
                              <ArrowRight size={14} className="opacity-70" />
                            </a>
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="block font-[family-name:var(--font-instrument-sans)] text-white mb-3 text-[15px]">
                              Your question
                            </label>
                            <textarea
                              value={form.question}
                              onChange={(e) => update("question", e.target.value)}
                              placeholder="Write the question exactly as a model should receive it..."
                              className="w-full min-h-[140px] rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-5 py-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none resize-y transition-colors"
                            />
                            <p className="mt-3 text-[13px] text-[color:var(--text-muted)] leading-relaxed">
                              A good question cannot be answered from a single proof-text. It
                              should pull across Law, Prophets, Gospels, and Epistles.
                            </p>
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="block font-[family-name:var(--font-instrument-sans)] text-white mb-3 text-[15px]">
                              Suggested answer
                            </label>
                            <textarea
                              value={form.answer}
                              onChange={(e) => update("answer", e.target.value)}
                              placeholder="What would a strong answer look like?"
                              className="w-full min-h-[120px] rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-5 py-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none resize-y transition-colors"
                            />
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="block font-[family-name:var(--font-instrument-sans)] text-white mb-4 text-[15px]">
                              Select a tier
                            </label>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {TIERS.map((t) => {
                                const selected = form.tier === t.value;
                                return (
                                  <button
                                    key={t.value}
                                    onClick={() => update("tier", t.value)}
                                    className={`text-left rounded-2xl border px-5 py-4 transition-all ${
                                      selected
                                        ? "bg-white text-[color:var(--accent-ink)] border-white shadow-lg shadow-white/10"
                                        : "bg-[color:var(--background)] border-[color:var(--border)] hover:border-white/60 text-[color:var(--text-primary)]"
                                    }`}
                                  >
                                    <div className="text-sm font-semibold">{t.label}</div>
                                    <div className="text-[12px] opacity-80 mt-0.5">{t.desc}</div>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    ) : step === 2 ? (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={stepContainerVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="min-h-[520px]"
                      >
                        <motion.div
                          variants={itemStagger}
                          initial="hidden"
                          animate="visible"
                          className="space-y-7"
                        >
                          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-5">
                            <div>
                              <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-3 text-[15px]">
                                <User size={16} className="text-[color:var(--text-secondary)]" />
                                Your name
                              </label>
                              <input
                                type="text"
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                placeholder="Jane Doe"
                                className="w-full h-12 rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-5 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none transition-colors"
                              />
                            </div>
                            <div>
                              <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-3 text-[15px]">
                                <Mail size={16} className="text-[color:var(--text-secondary)]" />
                                Email
                              </label>
                              <input
                                type="email"
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                placeholder="you@research.org"
                                className="w-full h-12 rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-5 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none transition-colors"
                              />
                            </div>
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-3 text-[15px]">
                              <BookOpen size={16} className="text-[color:var(--text-secondary)]" />
                              Tradition / affiliation
                            </label>
                            <input
                              type="text"
                              value={form.tradition}
                              onChange={(e) => update("tradition", e.target.value)}
                              placeholder="e.g. Reformed Baptist, Eastern Orthodox, non-denominational..."
                              className="w-full h-12 rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-5 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none transition-colors"
                            />
                            <p className="mt-3 text-[13px] text-[color:var(--text-muted)]">
                              We want voices from across the body of Christ.
                            </p>
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-3 text-[15px]">
                              <Layers size={16} className="text-[color:var(--text-secondary)]" />
                              Key references and sources
                            </label>
                            <textarea
                              value={form.references}
                              onChange={(e) => update("references", e.target.value)}
                              placeholder="Biblical texts, confessions, fathers, or scholars you draw from..."
                              className="w-full min-h-[100px] rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-5 py-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none resize-y transition-colors"
                            />
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <label className="block font-[family-name:var(--font-instrument-sans)] text-white mb-3 text-[15px]">
                              Why is this a good question?
                            </label>
                            <textarea
                              value={form.rationale}
                              onChange={(e) => update("rationale", e.target.value)}
                              placeholder="Explain what makes it fair, difficult, and textually grounded..."
                              className="w-full min-h-[100px] rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-5 py-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none resize-y transition-colors"
                            />
                            <p className="mt-3 text-[13px] text-[color:var(--text-muted)]">
                              Does it force synthesis across corpora? Name genuine uncertainty?
                              Represent multiple traditions charitably?
                            </p>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={stepContainerVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="min-h-[520px]"
                      >
                        <div className="space-y-6">
                          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-6 sm:p-7 overflow-hidden">
                            <h3 className="font-[family-name:var(--font-instrument-sans)] text-white text-lg mb-6">
                              Review your submission
                            </h3>
                            <div className="space-y-5 break-all">
                              <div>
                                <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1.5">
                                  Question
                                </div>
                                <p className="text-[15px] text-[color:var(--text-primary)] leading-relaxed">
                                  {form.question}
                                </p>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1.5">
                                    Tier
                                  </div>
                                  <p className="text-[15px] text-[color:var(--text-primary)]">
                                    {TIERS.find((t) => t.value === form.tier)?.label} · {" "}
                                    {TIERS.find((t) => t.value === form.tier)?.desc}
                                  </p>
                                </div>
                                <div>
                                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1.5">
                                    Submitted by
                                  </div>
                                  <p className="text-[15px] text-[color:var(--text-primary)]">
                                    {form.name}
                                    {form.tradition && (
                                      <span className="text-[color:var(--text-secondary)]">
                                        {" "}
                                        · {form.tradition}
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              {form.answer && (
                                <div>
                                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1.5">
                                    Suggested answer
                                  </div>
                                  <p className="text-[15px] text-[color:var(--text-secondary)] leading-relaxed whitespace-pre-line">
                                    {form.answer}
                                  </p>
                                </div>
                              )}
                              {form.references && (
                                <div>
                                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1.5">
                                    References
                                  </div>
                                  <p className="text-[15px] text-[color:var(--text-secondary)] leading-relaxed">
                                    {form.references}
                                  </p>
                                </div>
                              )}
                              {form.rationale && (
                                <div>
                                  <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)] mb-1.5">
                                    Rationale
                                  </div>
                                  <p className="text-[15px] text-[color:var(--text-secondary)] leading-relaxed">
                                    {form.rationale}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative border-t border-[color:var(--border)] p-5 sm:p-6">
                {!submitted ? (
                  <div className="max-w-xl mx-auto flex justify-between items-center">
                    <button
                      onClick={back}
                      disabled={step === 1}
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    {step < 3 ? (
                      <button
                        onClick={next}
                        disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                        className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        {step === 1 ? "Continue" : "Review"} <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 transition-colors"
                      >
                        <Send size={16} /> Submit question
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="max-w-xl mx-auto flex justify-center items-center">
                    <button
                      onClick={handleClose}
                      className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-white transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
