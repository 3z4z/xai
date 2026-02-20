"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Button({ children, className = "", onClick }) {
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

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-lg bg-base-300 px-5 py-3 transition-colors group cursor-pointer border border-primary/7 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-lg opacity-0 transition-opacity duration-100"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [x, y],
            ([latestX, latestY]) =>
              `radial-gradient(80px 40px at ${latestX}px ${latestY}px, rgba(56, 189, 248, 0.8), transparent 80%)`,
          ),
        }}
      />
      <div className="absolute inset-px z-10 rounded-lg bg-base-100" />
      <span className="relative z-20 font-medium text-base-content group-hover:text-primary transition-colors duration-200 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
