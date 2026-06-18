import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { redirectIfAuth } from "@/lib/route-guards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

const searchSchema = z.object({
  redirect: z.string().optional(),
  plan: z.enum(["monthly", "yearly"]).optional(),
});

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => redirectIfAuth({ search }),
  component: AuthPage,
});

const MIN_PASSWORD = 8;

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  const { redirect, plan } = Route.useSearch();
  const navigate = useNavigate();

  // After auth: continue where the user was headed (default the account area),
  // carrying the chosen plan through the funnel.
  const goNext = () => {
    navigate({
      to: redirect ?? "/account",
      search: plan ? { plan } : {},
    } as never);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    goNext();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < MIN_PASSWORD) {
      toast.error(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (!consent) {
      toast.error("Please accept the terms to create an account.");
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }

    if (data.session) {
      goNext();
    } else {
      setRegisteredEmail(email);
      toast.success("Verification email sent! Please check your inbox.");
    }
  };

  const handleResend = async () => {
    if (!registeredEmail) return;
    setResending(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: registeredEmail,
    });
    setResending(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Verification email resent!");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email to reset your password.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent! Check your inbox.");
    }
  };

  if (registeredEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground">
              We've sent a verification link to{" "}
              <span className="font-semibold text-foreground">{registeredEmail}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-sm text-muted-foreground">
              Please click the link in the email to confirm your account. Once verified, you can
              sign in.
            </p>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResend}
                disabled={resending}
              >
                {resending ? "Resending…" : "Resend email"}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setRegisteredEmail(null)}>
                Back to login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Skyward</CardTitle>
          <CardDescription>Log in or create an account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Button
                      variant="link"
                      type="button"
                      className="px-0 font-normal text-xs text-muted-foreground h-auto"
                      onClick={handleResetPassword}
                      disabled={loading}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading…" : "Login"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={MIN_PASSWORD}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    At least {MIN_PASSWORD} characters.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(c) => setConsent(c === true)}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm font-normal leading-snug text-muted-foreground"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms & Conditions
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={loading || !consent}>
                  {loading ? "Loading…" : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
