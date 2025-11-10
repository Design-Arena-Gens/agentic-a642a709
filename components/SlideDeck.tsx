"use client";

import { useMemo, useState } from "react";
import { slides } from "@/data/slides";
import clsx from "clsx";

const gradient =
  "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100";

export function SlideDeck() {
  const [activeIndex, setActiveIndex] = useState(0);

  const orderedSlides = useMemo(() => slides, []);

  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-6 py-10 sm:px-10">
      <header className="flex flex-col gap-2 text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-300">
          Agentic Strategy Deck
        </p>
        <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">
          AI 驅動創新落地藍圖
        </h1>
        <p className="text-sm text-slate-300">
          讓 AI 應用能力成為績效必備元素，結合 Google 工具建立可落地的創新循環。
        </p>
      </header>

      <nav className="glass-panel sticky top-4 z-20 flex flex-wrap items-center gap-3 px-5 py-3 text-xs text-slate-300 sm:text-sm">
        <span className="hidden font-medium text-white sm:inline">
          Slides
        </span>
        {orderedSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={clsx(
              "rounded-full border border-white/10 px-3 py-1 transition",
              index === activeIndex
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                : "bg-white/5 text-slate-300 hover:border-brand-400 hover:text-white"
            )}
            onClick={() => setActiveIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </nav>

      <main className="relative flex-1">
        <div className="relative grid gap-6">
          {orderedSlides.map((slide, index) => (
            <article
              key={slide.id}
              className={clsx(
                gradient,
                "glass-panel transform-gpu px-6 py-8 transition-all duration-500 sm:px-10 sm:py-12",
                index === activeIndex
                  ? "opacity-100 shadow-2xl"
                  : "opacity-0 pointer-events-none absolute inset-0"
              )}
            >
              <SlideContent slideIndex={index} />
            </article>
          ))}
        </div>
      </main>

      <footer className="flex items-center justify-between text-xs text-slate-500">
        <span>© 2024 AI Innovation Office</span>
        <div className="flex items-center gap-4">
          <span>{activeIndex + 1}</span>
          <span className="h-1 w-24 overflow-hidden rounded-full bg-slate-800">
            <span
              className="block h-full bg-brand-500 transition-all duration-500"
              style={{
                width: `${((activeIndex + 1) / orderedSlides.length) * 100}%`
              }}
            />
          </span>
          <span>{orderedSlides.length}</span>
        </div>
      </footer>
    </div>
  );
}

function SlideContent({ slideIndex }: { slideIndex: number }) {
  const slide = slides[slideIndex];

  return (
    <div className="flex h-full flex-col gap-8">
      {slide.kicker && (
        <p className="text-xs uppercase tracking-[0.4em] text-brand-300">
          {slide.kicker}
        </p>
      )}
      <header className="flex flex-col gap-3">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {slide.title}
        </h2>
        {slide.description && (
          <p className="text-base text-slate-200">{slide.description}</p>
        )}
        {slide.highlight && (
          <p className="rounded-2xl border border-brand-400/40 bg-brand-500/10 px-4 py-3 text-sm text-brand-100">
            {slide.highlight}
          </p>
        )}
      </header>

      {slide.bullets && (
        <ul className="grid gap-3 text-sm text-slate-200 sm:text-base">
          {slide.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-400" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {slide.twoColumns && (
        <div className="grid gap-6 sm:grid-cols-2">
          <ColumnBlock
            title={slide.twoColumns.leftTitle}
            items={slide.twoColumns.leftItems}
          />
          <ColumnBlock
            title={slide.twoColumns.rightTitle}
            items={slide.twoColumns.rightItems}
          />
        </div>
      )}

      {slide.timeline && (
        <div className="grid gap-4">
          {slide.timeline.map((item) => (
            <div
              key={item.phase + item.period}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold uppercase tracking-wide text-brand-200">
                  {item.phase}
                </div>
                <div className="text-sm text-slate-300">{item.period}</div>
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-slate-200">
                {item.focus.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-400" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {slide.stats && (
        <div className="grid gap-4 sm:grid-cols-3">
          {slide.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
            >
              <div className="text-sm uppercase tracking-widest text-brand-200">
                {stat.label}
              </div>
              <div className="mt-2 font-display text-3xl font-semibold text-white">
                {stat.value}
              </div>
              {stat.descriptor && (
                <div className="mt-2 text-xs text-slate-300">
                  {stat.descriptor}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {slide.callout && (
        <div className="rounded-2xl border border-brand-400/30 bg-brand-500/10 p-4 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
            {slide.callout.title}
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-brand-100">
            {slide.callout.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ColumnBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-200">
        {title}
      </h3>
      <ul className="mt-3 grid gap-2 text-sm text-slate-200">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
