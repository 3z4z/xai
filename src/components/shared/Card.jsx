"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Card({ children, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useTransform(
    [x, y],
    ([latestX, latestY]) =>
      `radial-gradient(400px 200px at ${latestX}px ${latestY}px, rgba(56, 189, 248, 0.8), transparent 80%)`,
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl p-px border border-primary/5 bg-base-300 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: background,
        }}
      />
      <div className="relative z-10 h-full w-full rounded-[15px] bg-neutral-950 px-10 py-12 min-h-[50dvh]">
        {children}
      </div>
    </motion.div>
  );
}
