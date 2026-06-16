import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { requireAuth } from "@/lib/route-guards";
import { EnrollmentQr } from "@/components/EnrollmentQr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/success")({
  ssr: false,
  beforeLoad: ({ location }) => requireAuth({ href: location.pathname }),
  component: SuccessPage,
});

const SETUP_STEPS = [
  "Factory reset your device, or start with a new one.",
  "On the welcome screen, tap the same spot 6 times to open QR enrollment.",
  "Connect to Wi-Fi if prompted, then scan the Skyward QR code below.",
];

function SuccessPage() {
  const { profile, refreshProfile } = useAuth();
  const isActive = profile?.subscription_status === "active";

  // The subscription is flipped to "active" by the Stripe webhook, which may
  // land a moment after the redirect. Poll briefly while it catches up.
  const [polls, setPolls] = useState(0);
  useEffect(() => {
    if (isActive || polls >= 6) return;
    const t = setTimeout(() => {
      refreshProfile();
      setPolls((p) => p + 1);
    }, 2000);
    return () => clearTimeout(t);
  }, [isActive, polls, refreshProfile]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center text-center">
          {isActive ? (
            <CheckCircle2 className="h-12 w-12 text-accent" />
          ) : (
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          )}
          <CardTitle className="mt-2">
            {isActive ? "You're all set!" : "Activating your subscription…"}
          </CardTitle>
          <CardDescription>
            {isActive
              ? "Your subscription is active. Follow the steps below to set up your device."
              : "This usually takes a few seconds. You can safely stay on this page."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <ol className="space-y-3">
            {SETUP_STEPS.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/30 p-6">
            <EnrollmentQr imei={profile?.imei} />
          </div>

          <div className="flex justify-center">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/account">Go to my account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
