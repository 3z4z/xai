"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "../shared/SectionTitle";
import DbPreviewSidebar from "./DbPreviewSidebar";
import DbPreviewNavbar from "./DbPreviewNavbar";
import DbPreviewContent from "./DbPreviewContent";
import { container } from "@/utils/classNames";

export default function DashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState("overview");
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <section className={`${container} pb-20`}>
      <SectionTitle title={"Dashboard Preview"} />
      <main className="bg-base-300 rounded-xl relative overflow-hidden">
        <DbPreviewNavbar onMenuClick={() => setOpenSidebar(true)} />

        <div className="lg:grid lg:grid-cols-[220px_1fr] gap-6 p-4">
          <div className="max-lg:hidden">
            <DbPreviewSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="h-full w-full bg-base-200 rounded-xl p-4">
            <DbPreviewContent activeTab={activeTab} />
          </div>
        </div>
        <AnimatePresence>
          {openSidebar && (
            <motion.div
              className="lg:hidden absolute inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/40"
                onClick={() => setOpenSidebar(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                exit={{ x: -260 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute left-0 top-0 h-full w-[240px] bg-base-300 p-4"
              >
                <DbPreviewSidebar
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setOpenSidebar(false);
                  }}
                  onClose={() => setOpenSidebar(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </section>
  );
}
