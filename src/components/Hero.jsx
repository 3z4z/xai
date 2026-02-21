/* eslint-disable react-hooks/purity */
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { motion, useScroll } from "framer-motion";
import Button from "./shared/Button";
import Image from "next/image";

function DataParticles({ scrollProgress }) {
  const pointsRef = useRef();
  const count = 2000;

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      const val = (Math.random() - 0.5) * 16;
      pos[i] = val;
      initial[i] = val;
    }
    return [pos, initial];
  }, []);

  useFrame(() => {
    const progress = scrollProgress.get(); // 0 → 1
    const positionsArray = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      let targetX, targetY, targetZ;

      if (progress < 0.33) {
        // RAW DATA
        targetX = initialPositions[i3];
        targetY = initialPositions[i3 + 1];
        targetZ = initialPositions[i3 + 2];
      } else if (progress < 0.66) {
        // STRUCTURED (sphere)
        const r = 2;
        targetX = r * Math.sin(phi) * Math.cos(theta);
        targetY = r * Math.sin(phi) * Math.sin(theta);
        targetZ = r * Math.cos(phi);
      } else {
        // EXPANDED INTELLIGENCE
        const r = 4;
        targetX = r * Math.sin(phi) * Math.cos(theta);
        targetY = r * Math.sin(phi) * Math.sin(theta);
        targetZ = r * Math.cos(phi);
      }

      // smooth lerp motion
      positionsArray[i3] += (targetX - positionsArray[i3]) * 0.05;
      positionsArray[i3 + 1] += (targetY - positionsArray[i3 + 1]) * 0.05;
      positionsArray[i3 + 2] += (targetZ - positionsArray[i3 + 2]) * 0.05;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // subtle rotation for life
    pointsRef.current.rotation.y += 0.002;
    pointsRef.current.rotation.x += 0.001;

    // subtle scale growth based on progress
    const scale = 1 + progress * 0.3;
    pointsRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        size={0.05}
        sizeAttenuation
        color="#335"
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

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
      {/* Sticky viewport */}
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* Canvas background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <DataParticles scrollProgress={scrollYProgress} />
          </Canvas>
        </div>

        {/* Content */}
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

        {/* vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)]" />
      </div>
    </section>
  );
}
