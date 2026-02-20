"use client";

import { motion } from "framer-motion";
import SectionTitle from "../shared/SectionTitle";
import DbPreviewSidebar from "./DbPreviewSidebar";

export default function DashboardPreviewSection() {
  return (
    <section className="py-40 px-20">
      <SectionTitle title={"Dashboard Preview"} />
      <div className="bg-[#0b1220] rounded-xl p-8 grid grid-cols-[220px_1fr] gap-6">
        <DbPreviewSidebar />
        <div className="h-full w-full bg-secondary/15 rounded-xl"></div>
      </div>
    </section>
  );
}
