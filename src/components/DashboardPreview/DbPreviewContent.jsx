"use client";

import { motion } from "framer-motion";

import OverviewTab from "./tabs/OverviewsTab";
import Placeholder from "./tabs/PlaceholderTab";

export default function DbPreviewContent({ activeTab }) {
  return (
    <motion.section
      key={activeTab}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 rounded-3xl"
    >
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "insights" && <Placeholder title="Insights" />}
      {activeTab === "automation" && <Placeholder title="Automation" />}
      {activeTab === "profile" && <Placeholder title="Profile" />}
      {activeTab === "settings" && <Placeholder title="Settings" />}
    </motion.section>
  );
}
