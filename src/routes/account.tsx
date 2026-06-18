import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { createPortalSession } from "@/lib/backend";
import { requireAuth } from "@/lib/route-guards";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  const { user, profile, refreshProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const [imei, setImei] = useState("");
  const [savingImei, setSavingImei] = useState(false);
  const [openingPortal, setOpeningPortal] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  useEffect(() => {
    setImei(profile?.imei ?? "");
  }, [profile?.imei]);

  const status = profile?.subscription_status ?? "inactive";
  const statusInfo = STATUS_LABELS[status] ?? STATUS_LABELS.inactive;
  const hasSubscription = status === "active" || status === "past_due";
  const imeiChanged = imei !== (profile?.imei ?? "");

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
    toast.success("Device IMEI updated.");
  };

  const handleManageSubscription = async () => {
    setOpeningPortal(true);
    try {
      const { url } = await createPortalSession();
      window.location.href = url;
    } catch (err) {
      setOpeningPortal(false);
      toast.error(err instanceof Error ? err.message : "Couldn't open the billing portal.");
    }
  };

  const handleSignOut = async () => {
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
              {profile?.plan ? `Skyward ${profile.plan} plan` : "No active plan yet."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasSubscription ? (
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleManageSubscription}
                disabled={openingPortal}
              >
                {openingPortal ? "Opening…" : "Manage / cancel subscription"}
              </Button>
            ) : (
              <Button asChild className="rounded-full">
                <Link to="/onboarding">Start a subscription</Link>
              </Button>
            )}
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
