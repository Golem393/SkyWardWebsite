import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { requireAuth } from "@/lib/route-guards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/onboarding")({
  ssr: false,
  beforeLoad: ({ location }) => requireAuth({ href: location.pathname, search: {} }),
  component: OnboardingPage,
});

function isValidImei(value: string) {
  return /^\d{15}$/.test(value);
}

function OnboardingPage() {
  const navigate = useNavigate();
  const { profile, user, refreshProfile } = useAuth();

  const [imei, setImei] = useState("");
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
    const { error } = await supabase.from("profiles").update({ imei }).eq("id", user.id);
    if (error) {
      setSubmitting(false);
      toast.error(`Couldn't save your IMEI: ${error.message}`);
      return;
    }
    await refreshProfile();

    navigate({ to: "/setup" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <Navbar />
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

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Saving…" : "Continue"}
              {!submitting && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
