import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { usePostHog } from "@posthog/react";
import { Check, ArrowLeft, Shield, RefreshCw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TITLE = "Pricing — Skyward";
const DESCRIPTION = "Simple, transparent pricing. Everything you need to reclaim your focus.";

export const Route = createFileRoute("/pricing")({
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
  component: PricingPage,
});

const features = [
  "Works on Samsung, Google, or Motorola phones Android 11+",
  "One device per subscription",
  "30-day money-back guarantee",
];

function PricingPage() {
  const posthog = usePostHog();
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const handleGetSkyward = () => {
    posthog.capture("pricing_plan_selected", {
      plan: isAnnual ? "yearly" : "monthly",
      source: "pricing_page",
    });
    navigate({ to: "/auth", search: { mode: "register" } });
  };

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      {/* Hero + Pricing card — single aurora section so there's no background seam */}
      <section className="aurora pt-32 pb-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold -tracking-[0.03em] text-foreground">
            Pricing
          </h1>
        </div>

        <div className="max-w-md mx-auto mt-12">
          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center rounded-full glass p-1 text-sm">
              <button
                id="billing-monthly"
                onClick={() => setIsAnnual(false)}
                className={`rounded-full px-5 py-1.5 font-medium transition-colors ${
                  !isAnnual
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                id="billing-annual"
                onClick={() => setIsAnnual(true)}
                className={`rounded-full px-5 py-1.5 font-medium transition-colors ${
                  isAnnual
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl bg-card border border-border p-8 shadow-[0_30px_80px_-20px_rgba(125,167,217,0.4)] animate-fade-in text-left">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-foreground">Skyward</h2>
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-6xl font-semibold -tracking-[0.02em] text-foreground">
                ${isAnnual ? "59" : "7.99"}
              </span>
              <span className="text-muted-foreground">{isAnnual ? "/yr" : "/mo"}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {isAnnual ? "Billed annually. Cancel anytime." : "Billed monthly. Cancel anytime."}
            </p>

            <Button
              id="pricing-cta"
              onClick={handleGetSkyward}
              className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 shadow-[0_12px_32px_-10px_rgba(125,167,217,0.7)]"
            >
              {"Get started"}
            </Button>

            <ul className="mt-6 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
