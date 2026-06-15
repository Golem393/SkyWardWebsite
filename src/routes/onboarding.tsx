import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { createCheckoutSession } from "@/lib/backend";
import { requireAuth } from "@/lib/route-guards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const searchSchema = z.object({
  plan: z.enum(["monthly", "yearly"]).optional(),
});

export const Route = createFileRoute("/onboarding")({
  validateSearch: searchSchema,
  beforeLoad: ({ location, search }) => requireAuth({ href: location.pathname, search }),
  component: OnboardingPage,
});

const PRICES = {
  monthly: { label: "Monthly", price: "$7.99", cadence: "/mo" },
  yearly: { label: "Annual", price: "$59", cadence: "/yr" },
} as const;

function isValidImei(value: string) {
  return /^\d{15}$/.test(value);
}

function OnboardingPage() {
  const { profile, user, refreshProfile } = useAuth();
  const { plan: planFromSearch } = Route.useSearch();

  const [imei, setImei] = useState("");
  const [plan, setPlan] = useState<"monthly" | "yearly">(planFromSearch ?? "monthly");
  const [submitting, setSubmitting] = useState(false);

  // Prefill IMEI once the profile loads.
  useEffect(() => {
    if (profile?.imei) setImei(profile.imei);
  }, [profile?.imei]);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidImei(imei)) {
      toast.error("Enter a valid 15-digit IMEI.");
      return;
    }
    if (!user) return;
    setSubmitting(true);

    // Persist the IMEI to the user's profile row (RLS: own row only).
    const { error } = await supabase
      .from("profiles")
      .update({ imei })
      .eq("id", user.id);
    if (error) {
      setSubmitting(false);
      toast.error(`Couldn't save your IMEI: ${error.message}`);
      return;
    }
    await refreshProfile();

    // Hand off to Stripe Checkout for the chosen plan.
    try {
      const { url } = await createCheckoutSession(plan);
      window.location.href = url;
    } catch (err) {
      setSubmitting(false);
      toast.error(err instanceof Error ? err.message : "Couldn't start checkout.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Link your device</CardTitle>
          <CardDescription>
            Enter your device's IMEI to link it to your account. Find it by dialing{" "}
            <span className="font-medium text-foreground">*#06#</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContinue} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="imei">IMEI number</Label>
              <Input
                id="imei"
                inputMode="numeric"
                placeholder="15-digit IMEI"
                required
                value={imei}
                onChange={(e) => setImei(e.target.value.replace(/\D/g, "").slice(0, 15))}
                maxLength={15}
              />
            </div>

            <div className="space-y-2">
              <Label>Plan</Label>
              <div className="grid grid-cols-2 gap-2">
                {(["monthly", "yearly"] as const).map((key) => {
                  const active = plan === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPlan(key)}
                      className={[
                        "rounded-xl border p-3 text-left transition-colors",
                        active
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40",
                      ].join(" ")}
                    >
                      <span className="block text-sm font-medium text-foreground">
                        {PRICES[key].label}
                      </span>
                      <span className="text-muted-foreground">
                        <span className="text-lg font-semibold text-foreground">
                          {PRICES[key].price}
                        </span>
                        {PRICES[key].cadence}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Redirecting…" : "Continue to payment"}
              {!submitting && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              You can change these details later from your account.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
