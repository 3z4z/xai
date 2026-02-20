import DashboardPreviewSection from "@/components/DashboardPreview/DashboardPreview";
import HeroSection from "@/components/Hero";
import InsightsSection from "@/components/Insights";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InsightsSection />
      <DashboardPreviewSection />
    </>
  );
}
