"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "./shared/Button";
import SectionTitle from "./shared/SectionTitle";
import { container } from "@/utils/classNames";
import DataEvolution from "./shared/DataEvolution";
import { insightSteps } from "@/utils/mockData";
import InsightCard from "./shared/InsightCard";

gsap.registerPlugin(ScrollTrigger);

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
          end: `+=${insightSteps.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            gsap.to(cards, {
              top: "0%",
              yPercent: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(cards, {
              top: "0%",
              yPercent: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          },
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
          {insightSteps.map((step, index) => (
            <InsightCard index={index} step={step} key={index} />
          ))}
        </div>
      </div>
      <div className="h-[20vh]" />
    </section>
  );
}
