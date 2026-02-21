/* eslint-disable react-hooks/purity */
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles({ mode }) {
  const pointsRef = useRef();
  const time = useRef(0);
  const { camera } = useThree();

  const COUNT = 2000;

  // ---------- RANDOM ----------
  const randomPositions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  // ---------- CLUSTERS ----------
  const clusterTargets = useMemo(() => {
    const centers = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, -1, 0),
    ];

    const arr = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const c = centers[i % centers.length];
      arr[i * 3] = c.x + (Math.random() - 0.5) * 0.6;
      arr[i * 3 + 1] = c.y + (Math.random() - 0.5) * 0.6;
      arr[i * 3 + 2] = c.z + (Math.random() - 0.5) * 0.6;
    }

    return arr;
  }, []);

  // ---------- CUBE ----------
  const cubeTargets = useMemo(() => {
    const size = 3;
    const arr = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * size;
      const y = (Math.random() - 0.5) * size;
      const z = (Math.random() - 0.5) * size;

      const axis = Math.floor(Math.random() * 3);

      if (axis === 0) {
        arr[i * 3] = Math.sign(x) * size * 0.5;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;
      } else if (axis === 1) {
        arr[i * 3] = x;
        arr[i * 3 + 1] = Math.sign(y) * size * 0.5;
        arr[i * 3 + 2] = z;
      } else {
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = Math.sign(z) * size * 0.5;
      }
    }

    return arr;
  }, []);

  // current mutable positions
  const positions = useRef(randomPositions.slice());

  useFrame((state, delta) => {
    time.current += delta;

    const t = time.current;

    const target =
      mode === 0 ? randomPositions : mode === 1 ? clusterTargets : cubeTargets;

    const current = positions.current;

    for (let i = 0; i < current.length; i += 3) {
      let tx = target[i];
      let ty = target[i + 1];
      let tz = target[i + 2];

      // 🌊 STEP 1 — FLOATING NOISE
      if (mode === 0) {
        const id = i * 0.001;

        tx += Math.sin(t + id) * 0.2;
        ty += Math.cos(t * 0.8 + id) * 0.2;
        tz += Math.sin(t * 0.6 + id) * 0.2;
      }

      // 🧠 STEP 2 — CLUSTER ORBIT
      if (mode === 1) {
        const id = i * 0.002;

        tx += Math.cos(t * 1.5 + id) * 0.15;
        ty += Math.sin(t * 1.5 + id) * 0.15;
      }

      // smooth interpolation
      current[i] += (tx - current[i]) * 0.05;
      current[i + 1] += (ty - current[i + 1]) * 0.05;
      current[i + 2] += (tz - current[i + 2]) * 0.05;
    }

    // update GPU buffer
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // 🔒 lock camera
    camera.position.set(0, 0, 7);
    camera.lookAt(0, 0, 0);

    // 🔷 STEP 3 rotation
    if (mode === 2) {
      pointsRef.current.rotation.y += 0.003;
      pointsRef.current.rotation.x += 0.002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions.current}
          count={positions.current.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.03}
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function DataEvolution({ step }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%" }}
      // 🚫 kill scroll + pointer interaction completely
      onWheel={(e) => e.preventDefault()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerMove={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
    >
      <Particles mode={step} />
    </Canvas>
  );
}
