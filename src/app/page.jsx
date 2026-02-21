import DashboardPreviewSection from "@/components/DashboardPreview/DashboardPreview";
import HeroSection from "@/components/Hero";
import InsightsSection from "@/components/Insights";
import SignatureInteractionSection from "@/components/SignatureInteraction";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InsightsSection />
      <DashboardPreviewSection />
      <SignatureInteractionSection />
    </>
  );
}
