"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Button from "./shared/Button";
import Image from "next/image";
import { DataParticles } from "./shared/DataParticles";

export default function HeroSection() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const handleScroll = () => {
    const nextSection = document.getElementById("insights");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} id="hero" className="h-[220vh] relative bg-base-100">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <DataParticles scrollProgress={scrollYProgress} />
          </Canvas>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none px-3 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold flex items-center max-sm:flex-col gap-4">
            <div className="flex justify-center items-center gap-1">
              <figure className="relative size-13 sm:size-15 md:size-17 lg:size-20">
                <Image
                  src="/logo.png"
                  fill
                  alt="logo"
                  className="object-contain"
                />
              </figure>
              <span> ai</span>
            </div>
            <span className="max-sm:hidden">-</span>
            <span className="text-gradient">Intelligence Workspace</span>
          </h1>

          <p className="opacity-70 mt-1 md:mt-3 lg:mt-6 text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">
            From raw data to actionable intelligence
          </p>

          <div className="flex justify-center items-center mt-10 pointer-events-auto">
            <Button onClick={handleScroll}>How Xai works</Button>
          </div>
        </motion.div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)]" />
      </div>
    </section>
  );
}
