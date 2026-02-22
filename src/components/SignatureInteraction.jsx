"use client";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, PerspectiveCamera } from "@react-three/drei";
import { DataMorph } from "./shared/DataMorph";

export default function SignatureInteractionSection() {
  const mouse = useRef([0, 0]);
  const [isExploding, setIsExploding] = useState(false);

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
