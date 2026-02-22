/* eslint-disable react-hooks/purity */
"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useScroll, useSpring } from "framer-motion";
import * as THREE from "three";

export function DataMorph({ mouse, isExploding, setIsExploding }) {
  const pointsRef = useRef();
  const groupRef = useRef();
  const meshRef = useRef();
  const count = 4000;

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  const stages = useMemo(() => {
    const random = new Float32Array(count * 3);
    const sphere = new Float32Array(count * 3);
    const polyhedron = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      random[i * 3] = (Math.random() - 0.5) * 15;
      random[i * 3 + 1] = (Math.random() - 0.5) * 15;
      random[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      sphere[i * 3] = 6.5 * Math.cos(theta) * Math.sin(phi);
      sphere[i * 3 + 1] = 6.5 * Math.sin(theta) * Math.sin(phi);
      sphere[i * 3 + 2] = 6.5 * Math.cos(phi);

      polyhedron[i * 3] = 1.5 * Math.cos(theta) * Math.sin(phi);
      polyhedron[i * 3 + 1] = 1.5 * Math.sin(theta) * Math.sin(phi);
      polyhedron[i * 3 + 2] = 1.5 * Math.cos(phi);
    }

    return { random, sphere, polyhedron };
  }, []);

  useFrame(() => {
    const t = smoothProgress.get();
    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count * 3; i++) {
      let target;

      if (t < 0.4) {
        target = THREE.MathUtils.lerp(
          stages.random[i],
          stages.sphere[i],
          t / 0.4,
        );
      } else {
        target = THREE.MathUtils.lerp(
          stages.sphere[i],
          stages.polyhedron[i],
          (t - 0.4) / 0.6,
        );
      }

      if (isExploding) target *= 1.5;

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
            array={stages.random}
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
