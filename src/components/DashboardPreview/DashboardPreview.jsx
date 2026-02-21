"use client";

import SectionTitle from "../shared/SectionTitle";
import DbPreviewSidebar from "./DbPreviewSidebar";
import DbPreviewNavbar from "./DbPreviewNavbar";
import DbPreviewContent from "./DbPreviewContent";
import { container } from "@/utils/classNames";

export default function DashboardPreviewSection() {
  return (
    <section className={`${container} pb-20`}>
      <SectionTitle title={"Dashboard Preview"} />
      <main className="bg-base-300 rounded-xl">
        <DbPreviewNavbar />
        <div className="lg:grid lg:grid-cols-[220px_1fr] gap-6 p-4">
          <DbPreviewSidebar />
          <div className="h-full w-full bg-base-200 rounded-xl p-4">
            <DbPreviewContent />
          </div>
        </div>
      </main>
    </section>
  );
}
