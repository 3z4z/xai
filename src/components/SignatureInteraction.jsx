/* eslint-disable react-hooks/purity */
"use client";
import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Stars,
  MeshDistortMaterial,
  PerspectiveCamera,
} from "@react-three/drei";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

function DataMorph({ mouse, isExploding, setIsExploding }) {
  const pointsRef = useRef();
  const groupRef = useRef();
  const meshRef = useRef();
  const count = 4000;

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  const [randomPos, spherePos] = useMemo(() => {
    const random = new Float32Array(count * 3);
    const sphere = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      random[i * 3] = (Math.random() - 0.5) * 15;
      random[i * 3 + 1] = (Math.random() - 0.5) * 15;
      random[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      sphere[i * 3] = 2.5 * Math.cos(theta) * Math.sin(phi);
      sphere[i * 3 + 1] = 2.5 * Math.sin(theta) * Math.sin(phi);
      sphere[i * 3 + 2] = 2.5 * Math.cos(phi);
    }
    return [random, sphere];
  }, []);

  useFrame((_) => {
    const t = smoothProgress.get();
    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count * 3; i++) {
      let target = THREE.MathUtils.lerp(randomPos[i], spherePos[i], t);
      if (isExploding) {
        target *= 1.5;
      }

      positions[i] = THREE.MathUtils.lerp(positions[i], target, 0.1);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const targetX = (mouse.current[0] * Math.PI) / 10;
    const targetY = (mouse.current[1] * Math.PI) / 10;
    groupRef.current.rotation.x +=
      0.05 * (targetY - groupRef.current.rotation.x);
    groupRef.current.rotation.y +=
      0.05 * (targetX - groupRef.current.rotation.y);

    pointsRef.current.rotation.y += 0.001;
    meshRef.current.rotation.z += 0.01;
  });

  return (
    <group ref={groupRef}>
      <points
        ref={pointsRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsExploding(!isExploding);
        }}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={randomPos}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.017}
          color={isExploding ? "#ebb600" : "#777"}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial
          color={isExploding ? "#ff2335" : "#00a9ff"}
          speed={5}
          distort={isExploding ? 0.8 : 0.2}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

export default function SignatureInteractionSection() {
  const mouse = useRef([0, 0]);
  const [isExploding, setIsExploding] = useState(false);
  const { scrollYProgress } = useScroll();

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.05, 0.2, 0.2, 0.05],
  );
  const textScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);

  return (
    <section
      onMouseMove={(e) => {
        mouse.current = [
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
        ];
      }}
      className="relative h-[200vh] snap-start"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 cursor-pointer">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#818cf8" />
            <DataMorph
              mouse={mouse}
              isExploding={isExploding}
              setIsExploding={setIsExploding}
            />
          </Canvas>
        </div>

        <div className="absolute top-24 left-12 z-20 max-w-md pointer-events-none">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-secondary" />
            <p className="text-secondary font-mono text-xs uppercase tracking-[0.45em]">
              Interactive Core
            </p>
          </div>
          <h3 className="text-4xl font-light tracking-tight mb-2">
            Click to{" "}
            <span className="font-semibold italic text-primary">Stimulate</span>
          </h3>
          <p className="opacity-60 text-sm font-light leading-relaxed">
            The core reacts to neural stimuli. Tap the data cluster to trigger a
            re-organization sequence.
          </p>
        </div>

        <div className="absolute bottom-12 right-12 z-20 text-right font-mono text-xs pointer-events-none">
          <div className="space-y-1 uppercase tracking-widest">
            <p>
              <span className="opacity-35 me-1.5">Interactivity:</span>
              <span className="text-primary">Enabled</span>
            </p>
            <p>
              <span className="opacity-35 me-1.5">Vertex State:</span>
              <span
                className={`${isExploding ? "text-warning" : "text-success"}`}
              >
                {isExploding ? "Unstable" : "Structured"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
