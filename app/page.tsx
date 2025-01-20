import { LandingEnd } from "@/components/LandingEnd";
import { LandingFeature } from "@/components/LandingFeature";
import { LandingFooter } from "@/components/LandingFooter";
import { LandingHeroSection } from "@/components/LandingHeroSection";
import { LandingNavbar } from "@/components/LandingNavbar";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto min-h-screen flex flex-col">
      <div className="absolute inset-0 top-0 left-0  h-screen w-full items-center px-5 py-24 dark:[background:radial-gradient(87.03%_87.03%_at_50.05%_12.97%,rgba(217,217,217,0)_40%,#000000_100%)] [background:radial-gradient(87.03%_87.03%_at_50.05%_12.97%,rgba(217,217,217,0)_40%,#ffffff_100%)]"></div>
      <LandingNavbar />
      <LandingHeroSection />
      <LandingFeature />
      <LandingEnd />
      <LandingFooter />
    </main>
  );
}
