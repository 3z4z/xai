"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "./shared/Button";
import SectionTitle from "./shared/SectionTitle";
import { container } from "@/utils/classNames";
import DataEvolution from "./shared/DataEvolution";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Ingest Data",
    subtitle: "Unified Data Aggregation",
    text: "Bridge the gap between siloed environments. Our engine connects to your entire stack—SQL, NoSQL, APIs, and raw documents—normalizing disparate data into a high-fidelity vector space in real-time.",
    features: ["Multi-source Sync", "Auto-Schema Mapping", "Real-time ETL"],
  },
  {
    title: "Analyze with AI",
    subtitle: "Neural Context Engine",
    text: "Move beyond keyword search. Our LLM-orchestration layer performs deep semantic analysis, identifying hidden correlations and anomalies across millions of data points that human observers miss.",
    features: ["Pattern Recognition", "Semantic Search", "Anomaly Detection"],
  },
  {
    title: "Generate Insight",
    subtitle: "Strategic Decision Intelligence",
    text: "Convert complexity into clarity. Automated reports, executive summaries, and predictive forecasting are generated instantly, providing a clear roadmap for your next strategic move.",
    features: ["Automated Reporting", "Trend Forecasting", "Actionable Alerts"],
  },
];

export default function InsightsSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const isSmallScreen = window.innerWidth <= 768;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".insight-card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${steps.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          // When leaving downward, animate cards to the top
          onLeave: () => {
            gsap.to(cards, {
              top: "0%",
              yPercent: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          },
          // When leaving upward, animate cards to the top (or wherever you prefer)
          onLeaveBack: () => {
            gsap.to(cards, {
              top: "0%",
              yPercent: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          },
          // When re-entering, snap them back to center smoothly
          onEnter: () => {
            gsap.to(cards, {
              top: isSmallScreen ? "32%" : "50%",
              yPercent: -20,
              duration: 0.5,
              ease: "power2.inOut",
            });
          },
          onEnterBack: () => {
            gsap.to(cards, {
              top: isSmallScreen ? "32%" : "50%",
              yPercent: -20,
              duration: 0.5,
              ease: "power2.inOut",
            });
          },
        },
      });

      cards.forEach((card, i) => {
        // Initial state for all cards to ensure they are centered while active
        if (i === 0) {
          tl.to(card, { opacity: 1, duration: 0.1 });
        } else {
          tl.fromTo(
            card,
            { xPercent: 100, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              duration: 1,
            },
            i - 0.5,
          );
        }

        if (i < cards.length - 1) {
          tl.to(
            cards[i],
            {
              scale: 0.9,
              opacity: 0.1,
              filter: "blur(4px)",
              duration: 1,
            },
            i + 0.5,
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="insights" className={`${container} bg-base-100`}>
      <SectionTitle
        title={"The Intelligence Journey"}
        subText={"Scroll to see how we turn raw chaos into strategic clarity."}
        className={"max-md:pb-48"}
      />
      <div
        ref={containerRef}
        className="relative min-h-[calc(85vh)] md:min-h-[calc(70vh)] flex flex-col justify-center"
      >
        <div className="relative flex-1 flex items-center justify-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="insight-card absolute w-full flex flex-col md:flex-row gap-12 items-center"
            >
              <span className="max-lg:hidden absolute xl:-left-20 lg:left-12 xl:-top-20 lg:-top-40 max-xl:text-[16rem] text-[20rem] font-bold opacity-[0.03] select-none pointer-events-none">
                {index + 1}
              </span>

              <div className="flex-1 space-y-6 z-10">
                <div className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-sm font-mono uppercase tracking-tighter bg-primary/5">
                  Phase {index + 1}
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gradient">
                  {step.title}
                </h2>
                <h3 className="md:text-lg lg:text-xl xl:text-2xl font-medium text-base-content/60 uppercase tracking-widest opacity-60">
                  {step.subtitle}
                </h3>
                <p className="text-lg md:text-xl leading-relaxed text-base-content/80 max-w-xl">
                  {step.text}
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  {step.features.map((feature) => (
                    <Button key={feature}>{feature}</Button>
                  ))}
                </div>
              </div>

              {/* Story Visual Placeholder - Imagine an SVG or Lottie animation here */}
              <div className="flex-1 w-full aspect-square bg-linear-to-br from-primary/10 to-transparent rounded-3xl border border-primary/5 flex items-center justify-center relative group overflow-hidden max-md:max-w-[520px] max-sm:max-w-[400px] max-md:px-6">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[32px_32px]" />
                <div className="relative w-full aspect-square max-w-[520px]">
                  <div className="absolute inset-0">
                    <DataEvolution step={index} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[20vh]" /> {/* Buffer for scroll feel */}
    </section>
  );
}
