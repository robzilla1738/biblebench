import type { Metadata } from "next";
import { ArrowLeft, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PDF_PATH = "/ideal-question.pdf";
const SLIDES = Array.from({ length: 9 }, (_, i) => ({
  src: `/guide/slide-${String(i + 1).padStart(2, "0")}.png`,
  alt: `What makes an ideal question — slide ${i + 1} of 9`,
}));

export const metadata: Metadata = {
  title: "What makes an ideal question",
  description:
    "A short guide for contributors — the principles, structure, and common pitfalls behind a well-formed BibleBench question.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "What makes an ideal question | BibleBench",
    description:
      "A short guide for contributors — the principles, structure, and common pitfalls behind a well-formed BibleBench question.",
    url: "/guide",
    type: "article",
  },
};

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[color:var(--background)]/70 border-b border-[color:var(--border)]/60">
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
          href={PDF_PATH}
          download
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors duration-150 text-sm"
        >
          <Download size={14} /> Download PDF
        </a>
      </nav>
    </header>
  );
}

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--background)] text-[color:var(--text-primary)]">
      <Header />

      <main className="flex-1 pt-28 pb-24 px-6 md:px-8">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-12 md:mb-16">
            <div className="text-xs font-[family-name:var(--font-instrument-sans)] uppercase tracking-[0.18em] text-[color:var(--text-secondary)] mb-4">
              Contributor guide
            </div>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[color:var(--text-primary)] leading-[1.05] text-[clamp(2.25rem,4.5vw,3.25rem)]">
              What makes an ideal question
            </h1>
            <p className="mt-5 text-[color:var(--text-secondary)] text-[15px] md:text-base leading-relaxed max-w-2xl">
              The principles, structure, and common pitfalls behind a well-formed BibleBench
              question. Read this before submitting — it will save you a revision round.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--accent-ink)] px-4 py-2 text-sm font-[family-name:var(--font-instrument-sans)] hover:opacity-90 transition-opacity"
              >
                Submit a question
              </Link>
              <a
                href={PDF_PATH}
                download
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] text-[color:var(--text-primary)] px-4 py-2 text-sm hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
              >
                <Download size={14} /> Download PDF
              </a>
            </div>
          </div>

          <ol className="space-y-6 md:space-y-8">
            {SLIDES.map((slide, i) => (
              <li key={slide.src} className="space-y-3">
                <div className="flex items-center gap-3 px-1">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] tracking-wider text-[color:var(--text-muted)]">
                    {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-[color:var(--border)]/60" />
                </div>
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] overflow-hidden">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={2560}
                    height={1440}
                    priority={i < 2}
                    sizes="(max-width: 900px) 100vw, 900px"
                    className="w-full h-auto block"
                  />
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-16 md:mt-20 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <div className="font-[family-name:var(--font-instrument-serif)] text-xl md:text-2xl text-[color:var(--text-primary)]">
                Ready to contribute?
              </div>
              <p className="mt-2 text-[color:var(--text-secondary)] text-sm md:text-[15px] leading-relaxed max-w-lg">
                If your question fits the rubric, it belongs in the benchmark — regardless of
                your title. Contributors are credited in the manifest.
              </p>
            </div>
            <Link
              href="/submit"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--accent-ink)] px-5 py-2.5 text-sm font-[family-name:var(--font-instrument-sans)] font-medium hover:opacity-90 transition-opacity"
            >
              Submit a question
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
