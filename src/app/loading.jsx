"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="h-dvh w-full bg-base-100 fixed top-0 left-0 z-100 flex items-center justify-center">
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <figure className="relative size-16">
          <Image src={"/logo.png"} alt="logo" fill />
        </figure>
      </motion.div>
    </div>
  );
}
