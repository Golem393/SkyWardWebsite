import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { usePostHog } from "@posthog/react";
import { toast } from "sonner";
import { createCheckoutSessionAnon } from "@/lib/backend";

const features = [
  "Works on Samsung, Google, or Motorola phones Android 11+",
  "One device per subscription",
  "30-day money-back guarantee",
];

export function Pricing() {
  const posthog = usePostHog();
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetSkyward = async () => {
    const plan = isAnnual ? "yearly" : "monthly";
    posthog.capture("pricing_plan_selected", { plan });
    setLoading(true);
    try {
      console.log(plan);
      const { url } = await createCheckoutSessionAnon(plan);
      window.location.href = url;
    } catch (err) {
      setLoading(false);
      toast.error(
        err instanceof Error ? err.message : "Couldn't start checkout. Please try again.",
      );
    }
  };

  return (
    <section id="pricing" className="relative aurora px-6 py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground">
          Ready to end your phone addiciton?
        </h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
          Take the first step to get your life back.
        </p>

        <div className="mt-8 inline-flex items-center rounded-full glass p-1 text-sm">
          <button
            onClick={() => setIsAnnual(false)}
            className={`rounded-full px-5 py-1.5 font-medium transition-colors ${!isAnnual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`rounded-full px-5 py-1.5 font-medium transition-colors ${isAnnual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Annual
          </button>
        </div>

        <div
          className="mt-10 mx-auto max-w-md rounded-3xl bg-card border border-border p-8 text-left shadow-[0_30px_80px_-20px_rgba(125,167,217,0.45)] animate-fade-in"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          <div className="flex items-baseline justify-between">
            <h3 className="text-lg font-semibold text-foreground">Skyward</h3>
            <span className="text-xs uppercase tracking-widest text-accent">Most popular</span>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-5xl font-semibold -tracking-[0.02em] text-foreground">
              ${isAnnual ? "59" : "7.99"}
            </span>
            <span className="text-muted-foreground">{isAnnual ? "/yr + tax" : "/mo + tax"}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {isAnnual ? "Billed annually. Cancel anytime." : "Billed monthly. Cancel anytime."}
          </p>

          <Button
            onClick={handleGetSkyward}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 shadow-[0_12px_32px_-10px_rgba(125,167,217,0.7)] group"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting…
              </>
            ) : (
              <>
                Buy now via Stripe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
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
  );
}
