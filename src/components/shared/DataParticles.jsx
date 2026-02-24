/* eslint-disable react-hooks/purity */
"use client";

import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
export function DataParticles({ scrollProgress }) {
  const pointsRef = useRef();
  const count = 1200;

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
    const progress = scrollProgress.get();
    const positionsArray = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      let targetX, targetY, targetZ;

      if (progress < 0.33) {
        targetX = initialPositions[i3];
        targetY = initialPositions[i3 + 1];
        targetZ = initialPositions[i3 + 2];
      } else if (progress < 0.66) {
        const r = 2;
        targetX = r * Math.sin(phi) * Math.cos(theta);
        targetY = r * Math.sin(phi) * Math.sin(theta);
        targetZ = r * Math.cos(phi);
      } else {
        const r = 4;
        targetX = r * Math.sin(phi) * Math.cos(theta);
        targetY = r * Math.sin(phi) * Math.sin(theta);
        targetZ = r * Math.cos(phi);
      }

      positionsArray[i3] += (targetX - positionsArray[i3]) * 0.05;
      positionsArray[i3 + 1] += (targetY - positionsArray[i3 + 1]) * 0.05;
      positionsArray[i3 + 2] += (targetZ - positionsArray[i3 + 2]) * 0.05;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    pointsRef.current.rotation.y += 0.002;
    pointsRef.current.rotation.x += 0.001;

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
