"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Card from "./shared/Card";
import Button from "./shared/Button";
import SectionTitle from "./shared/SectionTitle";
import { container } from "@/utils/classNames";

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
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".insight-card");
      const totalScroll = window.innerHeight * (cards.length - 1);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + totalScroll,
          scrub: 0.5,
          pin: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { pointerEvents: "auto", opacity: 1 });
        }

        if (i !== 0) {
          tl.fromTo(
            card,
            { opacity: 0, y: 100, scale: 0.95, pointerEvents: "none" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: "auto",
              duration: 1,
            },
          );

          tl.to(
            cards[i - 1],
            {
              opacity: 0,
              scale: 0.9,
              pointerEvents: "none",
              duration: 1,
            },
            "<",
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="insights">
      <SectionTitle
        title={"How Xai Works"}
        subText={"See easy steps to understand Xai workflows."}
      />
      <div
        ref={containerRef}
        className={`${container} relative h-screen w-full`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center h-dvh`}
        >
          {steps.map((step, index) => (
            <Card
              key={index}
              className="insight-card absolute! max-w-[calc(100%-1rem)] w-full text-center group"
            >
              <div className="px-4 py-1 rounded-lg font-mono uppercase tracking-widest text-primary border border-primary/25 w-max mx-auto bg-primary/5 max-sm:text-xs max-md:text-sm">
                Step 0{index + 1}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-8 sm:mt-12 mb-2 text-gradient">
                {step.title}
              </h2>
              <p className="text-lg sm:text-xl text-base-content opacity-25 mb-8 sm:mb-12 tracking-wider uppercase">
                {step.subtitle}
              </p>
              <p className="sm:text-lg text-base-content/70 max-w-5xl mx-auto group-hover:text-base-content transition-all">
                {step.text}
              </p>

              {/* Added geometry features for detail */}
              <div className="flex flex-wrap justify-center sm:gap-3 gap-2 mt-12 sm:mt-16">
                {step.features.map((feature) => (
                  <Button
                    key={feature}
                    className="max-sm:text-xs max-md:text-sm"
                  >
                    {feature}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
