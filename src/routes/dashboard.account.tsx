import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { createPortalSession } from "@/lib/backend";
import { requireAuth } from "@/lib/route-guards";
import { usePostHog } from "@posthog/react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Check } from "lucide-react";

export const Route = createFileRoute("/dashboard/account")({
  ssr: false,
  beforeLoad: ({ location }) => requireAuth({ href: location.pathname }),
  component: AccountPage,
});

const STATUS_LABELS: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  active: { label: "Active", variant: "default" },
  trialing: { label: "Free Trial", variant: "default" },
  inactive: { label: "Inactive", variant: "secondary" },
  canceled: { label: "Canceled", variant: "destructive" },
  past_due: { label: "Past due", variant: "destructive" },
};

function AccountPage() {
  const posthog = usePostHog();
  const { user, profile, refreshProfile } = useAuth();

  const [openingPortal, setOpeningPortal] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  const status = profile?.subscription_status ?? "inactive";
  const statusInfo = STATUS_LABELS[status] ?? STATUS_LABELS.inactive;
  const handleManageSubscription = async () => {
    setOpeningPortal(true);
    posthog.capture("subscription_management_opened", { plan: profile?.plan ?? null });
    try {
      const { url } = await createPortalSession();
      window.location.href = url;
    } catch (err) {
      setOpeningPortal(false);
      toast.error(err instanceof Error ? err.message : "Couldn't open the billing portal.");
    }
  };



  const handleSendResetEmail = async () => {
    const email = profile?.email ?? user?.email;
    if (!email) return;
    setResettingPassword(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    setResettingPassword(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent! Please check your inbox.");
    }
  };

  return (
    <div className="py-8">
      <main className="mx-auto w-full max-w-2xl px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Your account</h1>
            <p className="text-sm text-muted-foreground">{profile?.email ?? user?.email}</p>
          </div>
        </div>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Subscription</CardTitle>
              <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
            </div>
            <CardDescription>
              {profile?.plan ? `Skyward ${profile.plan} plan` : "No active plan yet."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(profile?.subscription_status === "canceled" || profile?.cancel_at_period_end) && profile?.current_period_end && (
              <p className="text-sm text-destructive font-medium">
                Canceled. Access ends on{" "}
                {new Date(profile.current_period_end).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                .
              </p>
            )}
            {profile?.subscription_status === "trialing" && !profile?.cancel_at_period_end && profile?.current_period_end && (
              <p className="text-sm text-muted-foreground font-medium">
                Free trial ends on{" "}
                {new Date(profile.current_period_end).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                .
              </p>
            )}
            <div className="flex gap-3">
              {profile?.stripe_customer_id && (
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={handleManageSubscription}
                  disabled={openingPortal}
                >
                  {openingPortal ? "Opening…" : "Manage subscription"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Change your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              We'll send a secure link to your email to set a new password.
            </p>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleSendResetEmail}
              disabled={resettingPassword}
            >
              {resettingPassword ? "Sending email…" : "Reset password"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
