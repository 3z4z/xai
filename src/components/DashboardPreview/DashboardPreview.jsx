"use client";

import { motion } from "framer-motion";
import SectionTitle from "../shared/SectionTitle";
import DbPreviewSidebar from "./DbPreviewSidebar";
import DbPreviewNavbar from "./DbPreviewNavbar";
import DbPreviewContent from "./DbPreviewContent";
import { container } from "@/utils/classNames";

export default function DashboardPreviewSection() {
  return (
    <section className={`max-w-7xl mx-auto w-full pb-20`}>
      <SectionTitle title={"Dashboard Preview"} />
      <main className="bg-base-300 rounded-xl">
        <DbPreviewNavbar />
        <div className="grid grid-cols-[220px_1fr] gap-6 p-4">
          <DbPreviewSidebar />
          <div className="h-full w-full bg-base-200 rounded-xl p-4">
            <DbPreviewContent />
          </div>
        </div>
      </main>
    </section>
  );
}
