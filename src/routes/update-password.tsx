import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/update-password")({
  ssr: false,
  // Exchange the PKCE code (if present) before rendering, then require a session.
  beforeLoad: async () => {
    // If Supabase appended a ?code= param, exchange it for a session now.
    if (typeof window !== "undefined") {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("Not authenticated");
    }
    return { session };
  },
  errorComponent: () => {
    // If the guard fails (no session, expired code), show a message.
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Link expired</CardTitle>
            <CardDescription>
              This link has expired or is invalid. Please contact{" "}
              <a href="mailto:hello@skywardos.com" className="text-primary hover:underline">
                hello@skywardos.com
              </a>{" "}
              and we'll send you a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href="/auth"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 w-full"
            >
              Go to login
            </a>
          </CardContent>
        </Card>
      </div>
    );
  },
  component: UpdatePasswordPage,
});

const MIN_PASSWORD = 8;

function UpdatePasswordPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < MIN_PASSWORD) {
      toast.error(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (error) {
      toast.error(error.message);
    } else {
      const destination = profile?.imei ? "/setup" : "/onboarding";
      toast.success("Password created! Taking you to setup…");
      navigate({ to: destination });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your password</CardTitle>
          <CardDescription>Choose a strong password for your Skyward account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={MIN_PASSWORD}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">At least {MIN_PASSWORD} characters.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={MIN_PASSWORD}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Creating…" : "Create password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
