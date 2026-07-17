import { useState } from "react";
import { toast } from "sonner";
import { usePostHog } from "@posthog/react";
import { createCheckoutSession } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";

export function DashboardPricing() {
  const posthog = usePostHog();
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    posthog.capture("subscribe_started", { plan, seats: 1 });
    try {
      const { url } = await createCheckoutSession(plan, 1);
      window.location.href = url;
    } catch (err) {
      setLoading(false);
      toast.error(err instanceof Error ? err.message : "Couldn't start checkout.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background absolute inset-0 z-10">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center pt-16 px-4">
        {/* Toggle */}
        <div className="flex items-center rounded-full border shadow-sm p-1 mb-10 bg-background">
          <button
            type="button"
            onClick={() => setPlan("monthly")}
            className={`px-8 py-2 text-sm font-medium rounded-full transition-colors ${
              plan === "monthly"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setPlan("yearly")}
            className={`px-8 py-2 text-sm font-medium rounded-full transition-colors ${
              plan === "yearly"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Pricing Card */}
        <div className="w-full max-w-[500px] bg-card border rounded-2xl p-12 flex flex-col items-center shadow-sm">
          <div className="flex items-baseline gap-2 mb-10">
            <span className="text-5xl font-semibold tracking-tight text-foreground">
              ${plan === "monthly" ? "7.99" : "59"}
            </span>
            <span className="text-4xl font-bold tracking-tight text-foreground">
              / {plan === "monthly" ? "month" : "year"}
            </span>
          </div>
          <Button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading…
              </>
            ) : (
              "Start Free 14-Day Trial"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
