"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Mail, Send, User, Building2, X } from "lucide-react";
import { useEffect, useState } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function PartnerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const canSubmit = form.name.trim().length > 1 && form.email.includes("@");

  const handleSubmit = async () => {
    try {
      await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (e) {
      console.error("Partner submit failed:", e);
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", organization: "", message: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } }}
            exit={{ opacity: 0, scale: 0.98, y: 16, transition: { duration: 0.25, ease: EASE_OUT_EXPO } }}
            className="relative w-full max-w-lg rounded-3xl bg-[color:var(--surface)] border border-[color:var(--border)] shadow-2xl overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.04), transparent 50%)" }}
            />

            <div className="relative p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-[11px] font-[family-name:var(--font-instrument-sans)] uppercase tracking-[0.22em] text-[color:var(--text-secondary)] mb-2">
                    Partnership
                  </div>
                  <h2 className="font-[family-name:var(--font-instrument-serif)] text-white text-2xl sm:text-3xl">
                    Become a partner
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="inline-flex items-center justify-center size-10 rounded-full border border-[color:var(--border)] text-[color:var(--text-secondary)] hover:border-white hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
                      className="relative inline-flex items-center justify-center size-16 rounded-full bg-white text-[color:var(--accent-ink)] mb-6"
                    >
                      <Check size={28} />
                    </motion.div>
                    <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-white">
                      We'll be in touch
                    </h3>
                    <p className="mt-3 text-[color:var(--text-secondary)] text-[15px] leading-relaxed max-w-sm">
                      Thanks for your interest in partnering with BibleBench. We'll review your inquiry and reach out soon.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-white transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-2 text-[15px]">
                          <User size={15} className="text-[color:var(--text-secondary)]" />
                          Name
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full h-12 rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-2 text-[15px]">
                          <Mail size={15} className="text-[color:var(--text-secondary)]" />
                          Email
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@org.com"
                          className="w-full h-12 rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 font-[family-name:var(--font-instrument-sans)] text-white mb-2 text-[15px]">
                        <Building2 size={15} className="text-[color:var(--text-secondary)]" />
                        Organization
                      </label>
                      <input
                        type="text"
                        value={form.organization}
                        onChange={(e) => update("organization", e.target.value)}
                        placeholder="Seminary, church, ministry, company..."
                        className="w-full h-12 rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-[family-name:var(--font-instrument-sans)] text-white mb-2 text-[15px]">
                        How would you like to partner?
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Tell us about your organization and what partnership could look like..."
                        className="w-full min-h-[100px] rounded-2xl bg-[color:var(--background)] border border-[color:var(--border)] px-4 py-3 text-[15px] text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-white focus:outline-none resize-y transition-colors"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className="group inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-[color:var(--accent-ink)] font-medium hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send size={16} /> Send inquiry
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
