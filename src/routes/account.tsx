import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { createCheckoutSession, createPortalSession } from "@/lib/backend";
import { requireAuth } from "@/lib/route-guards";
import { usePostHog } from "@posthog/react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, Plus, Check } from "lucide-react";

export const Route = createFileRoute("/account")({
  ssr: false,
  beforeLoad: ({ location }) => requireAuth({ href: location.pathname }),
  component: AccountPage,
});

const STATUS_LABELS: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  active: { label: "Active", variant: "default" },
  inactive: { label: "Inactive", variant: "secondary" },
  canceled: { label: "Canceled", variant: "destructive" },
  past_due: { label: "Past due", variant: "destructive" },
};

function isValidImei(value: string) {
  return /^\d{15}$/.test(value);
}

function AccountPage() {
  const posthog = usePostHog();
  const { user, profile, subscription, refreshProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const [imei, setImei] = useState("");
  const [savingImei, setSavingImei] = useState(false);
  const [openingPortal, setOpeningPortal] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  const [resubscribePlan, setResubscribePlan] = useState<"monthly" | "yearly">("monthly");
  const [resubscribeSeats, setResubscribeSeats] = useState(1);
  const [resubscribing, setResubscribing] = useState(false);

  useEffect(() => {
    setImei(profile?.imei ?? "");
  }, [profile?.imei]);

  const status = subscription?.status ?? "inactive";
  const statusInfo = STATUS_LABELS[status] ?? STATUS_LABELS.inactive;
  const imeiChanged = imei !== (profile?.imei ?? "");

  const showResubscribe =
    !subscription?.status ||
    subscription.status === "canceled" ||
    subscription.status === "inactive" ||
    !!subscription.canceled_at_date;

  const handleSaveImei = async () => {
    if (!isValidImei(imei)) {
      toast.error("Enter a valid 15-digit IMEI.");
      return;
    }
    if (!user) return;
    setSavingImei(true);
    const { error } = await supabase.from("profiles").update({ imei }).eq("id", user.id);
    setSavingImei(false);
    if (error) {
      toast.error(`Couldn't save: ${error.message}`);
      return;
    }
    await refreshProfile();
    posthog.capture("device_imei_saved", { user_id: user.id });
    toast.success("Device IMEI updated.");
  };

  const handleManageSubscription = async () => {
    setOpeningPortal(true);
    posthog.capture("subscription_management_opened", { plan: subscription?.plan ?? null });
    try {
      const { url } = await createPortalSession();
      window.location.href = url;
    } catch (err) {
      setOpeningPortal(false);
      toast.error(err instanceof Error ? err.message : "Couldn't open the billing portal.");
    }
  };

  const handleResubscribe = async () => {
    setResubscribing(true);
    posthog.capture("resubscribe_started", { plan: resubscribePlan, seats: resubscribeSeats });
    try {
      const { url } = await createCheckoutSession(resubscribePlan, resubscribeSeats);
      window.location.href = url;
    } catch (err) {
      setResubscribing(false);
      toast.error(err instanceof Error ? err.message : "Couldn't start checkout.");
    }
  };

  const handleSignOut = async () => {
    posthog.capture("user_signed_out");
    await signOut();
    navigate({ to: "/" });
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-2xl px-4 pb-24 pt-32 space-y-6">
        <div className="-ml-4">
          <Button variant="ghost" asChild className="text-muted-foreground rounded-full">
            <Link to="/">← Back</Link>
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Your account</h1>
            <p className="text-sm text-muted-foreground">{profile?.email ?? user?.email}</p>
          </div>
          <Button variant="ghost" onClick={handleSignOut} className="rounded-full">
            Sign out
          </Button>
        </div>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Subscription</CardTitle>
              <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
            </div>
            <CardDescription>
              {subscription?.plan ? `Skyward ${subscription.plan} plan` : "No active plan yet."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscription?.canceled_at_date && (
              <p className="text-sm text-destructive font-medium">
                Canceled. Access ends on{" "}
                {new Date(
                  subscription.subscription_end_date || subscription.canceled_at_date,
                ).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                .
              </p>
            )}
            <div className="flex gap-3">
              {subscription?.stripe_customer_id && !showResubscribe && (
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={handleManageSubscription}
                  disabled={openingPortal}
                >
                  {openingPortal ? "Opening…" : "Manage subscription"}
                </Button>
              )}
              {showResubscribe && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="rounded-full">
                      {!subscription?.status ? "Subscribe" : "Resubscribe"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto rounded-lg">
                    <DialogHeader>
                      <DialogTitle>Choose your plan</DialogTitle>
                      <DialogDescription>
                        Select a plan and the number of devices you want to manage.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      {/* Plan Toggle */}
                      <div className="flex flex-col gap-2">
                        <Label>Billing cycle</Label>
                        <div className="flex rounded-md shadow-sm border p-1 bg-muted/50 w-full">
                          <button
                            type="button"
                            onClick={() => setResubscribePlan("monthly")}
                            className={`flex flex-col items-center justify-center flex-1 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors ${
                              resubscribePlan === "monthly"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span>Monthly</span>
                            <span className="text-xs font-normal opacity-80">($7.99/mo)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setResubscribePlan("yearly")}
                            className={`flex flex-col items-center justify-center flex-1 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors ${
                              resubscribePlan === "yearly"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span>Yearly</span>
                            <span className="text-xs font-normal opacity-80">($59/yr)</span>
                          </button>
                        </div>
                      </div>

                      {/* Seats Selector */}
                      <div className="flex flex-col gap-2">
                        <Label>Number of devices</Label>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setResubscribeSeats(Math.max(1, resubscribeSeats - 1))}
                            disabled={resubscribeSeats <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-xl font-medium w-8 text-center">
                            {resubscribeSeats}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setResubscribeSeats(resubscribeSeats + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <ul className="space-y-2 mt-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>Works on Samsung, Google, or Motorola phones Android 11+</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>One device per subscription</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>30-day money-back guarantee</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 pb-2 border-t mt-2">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="font-semibold text-foreground text-lg">
                        ${(resubscribePlan === "monthly" ? 7.99 * resubscribeSeats : 59 * resubscribeSeats).toFixed(2).replace(/\.00$/, "")}
                        <span className="text-sm font-normal text-muted-foreground">
                          {resubscribePlan === "monthly" ? "/mo" : "/yr"}
                        </span>
                      </span>
                    </div>

                    <Button onClick={handleResubscribe} disabled={resubscribing} className="w-full mt-2">
                      {resubscribing ? "Loading…" : "Checkout"}
                    </Button>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Device */}
        <Card>
          <CardHeader>
            <CardTitle>Device</CardTitle>
            <CardDescription>The IMEI of the device linked to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imei">IMEI number</Label>
              <div className="flex gap-2">
                <Input
                  id="imei"
                  inputMode="numeric"
                  placeholder="15-digit IMEI"
                  value={imei}
                  onChange={(e) => setImei(e.target.value.replace(/\D/g, "").slice(0, 15))}
                  maxLength={15}
                />
                <Button onClick={handleSaveImei} disabled={savingImei || !imeiChanged}>
                  {savingImei ? "Saving…" : "Save"}
                </Button>
              </div>
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
