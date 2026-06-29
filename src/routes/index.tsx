import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { AppPolicySection } from "@/components/landing/AppPolicySection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DemoVideo } from "@/components/landing/DemoVideo";
import { CompatibilitySection } from "@/components/landing/CompatibilitySection";
import { Faq } from "@/components/landing/Faq";
import { Pricing } from "@/components/landing/Pricing";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

const TITLE = "Skyward";
const DESCRIPTION =
  "Skyward removes social media, games, entertainment, and porn from your phone so you can focus on what matters.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      {/*<DemoVideo />*/}
      <ComparisonSection />
      <AppPolicySection />
      <HowItWorks />
      {/*<CompatibilitySection />*/}
      <Faq />
      <CtaSection />
      <Footer />
    </main>
  );
}
