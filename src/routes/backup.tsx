import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Smartphone,
  KeyRound,
  Wifi,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/backup")({
  ssr: false,
  component: BackupGuidePage,
});

// ─── Data ────────────────────────────────────────────────────────────────────

const DEVICES = [
  {
    name: "Samsung Devices",
    instruction: "Use Samsung Smart Switch to create a backup.",
    path: null,
  },
  {
    name: "Google Pixel Devices",
    instruction: "Use Google's built-in Android Backup.",
    path: "Settings → Google → Backup",
  },
  {
    name: "Motorola Devices",
    instruction: "Use Google's built-in Android Backup.",
    path: "Settings → Google → Backup",
  },
];

const AUTHENTICATOR_APPS = [
  "Google Authenticator",
  "Microsoft Authenticator",
  "Authy",
  "Duo Mobile",
];

const GOOGLE_ACCOUNT_CHECKS = [
  "You know your Google email address.",
  "You know your Google password.",
  "You can successfully sign in to your Google account.",
];

// ─── Component ───────────────────────────────────────────────────────────────

function BackupGuidePage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({
    backup: false,
    authenticator: false,
    google: false,
    esim: false,
  });

  const handleToggle = (key: keyof typeof checked) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isAllChecked = Object.values(checked).every(Boolean);

  const checklistItems = [
    { id: "backup", label: "Full device backup completed" },
    { id: "authenticator", label: "Authenticator accounts backed up or transferred" },
    { id: "google", label: "Google account credentials verified" },
    { id: "esim", label: "eSIM information verified (if applicable)" },
  ] as const;

  return (
    <div className="min-h-screen bg-background aurora px-4 py-16">
      <div className="mx-auto w-full max-w-2xl space-y-10">
        {/* Back link */}
        <div className="-ml-1">
          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground rounded-full hover:bg-muted/80"
          >
            <Link to="/setup">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Setup
            </Link>
          </Button>
        </div>

        {/* Page header */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Setup Guide
          </p>
          <h1 className="text-3xl font-semibold -tracking-[0.02em] text-foreground">
            Factory Reset Preparation Guide
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Before setting up Skyward, you'll need to factory reset your Android device.
          </p>
          <div className="flex gap-3 rounded-xl border border-amber-200 dark:border-amber-950 bg-amber-500/5 dark:bg-amber-500/10 px-4 py-3">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500 dark:text-amber-400" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              A factory reset permanently removes apps, accounts, contacts, photos, messages, and
              other data stored on the device. Skyward cannot recover any data that is erased during
              this process.
            </p>
          </div>
        </div>

        {/* ── Step 1: Create a Full Device Backup ── */}
        <Card className="glass border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-semibold">
                Step 1: Create a Full Device Backup
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Before continuing, we strongly recommend creating a full backup of your phone.
            </p>
            <div className="space-y-3">
              {DEVICES.map((d) => (
                <div
                  key={d.name}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-card/50 px-4 py-3 space-y-1"
                >
                  <p className="text-sm font-medium text-foreground">{d.name}</p>
                  <p className="text-sm text-muted-foreground">{d.instruction}</p>
                  {d.path && (
                    <p className="text-xs font-mono text-muted-foreground bg-muted/80 border border-slate-200 dark:border-slate-800/80 rounded px-2 py-0.5 inline-block">
                      {d.path}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-medium pt-1">
              If your backup completes successfully, most users are ready to continue.
            </p>
          </CardContent>
        </Card>

        {/* ── Step 2: Verify Your Authenticator Apps ── */}
        <Card className="glass border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-500 dark:text-amber-400" />
              <CardTitle className="text-base font-semibold">
                Step 2: Verify Your Authenticator Apps
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-semibold text-foreground">
              This is the most commonly forgotten step.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you use any of the following, make sure your accounts have been exported,
              transferred, or backed up before resetting your phone:
            </p>
            <ul className="space-y-2 pl-1">
              {AUTHENTICATOR_APPS.map((app) => (
                <li key={app} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {app}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 rounded-xl border border-amber-200 dark:border-amber-950 bg-amber-500/5 dark:bg-amber-500/10 px-4 py-3">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500 dark:text-amber-400" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Many users lose access to important accounts because they skip this step.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Step 3: Verify Your Google Account ── */}
        <Card className="glass border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <KeyRound className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-semibold">
                Step 3: Verify Your Google Account
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              After a factory reset, Android may require you to sign in using the Google account
              previously used on the device.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Before continuing, confirm:
            </p>
            <ul className="space-y-2.5">
              {GOOGLE_ACCOUNT_CHECKS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ── Step 4: eSIM Users ── */}
        <Card className="glass border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Wifi className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-semibold">Step 4: eSIM Users</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              If your phone uses an eSIM, verify that you know how to reactivate your mobile service
              after the reset.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Some carriers may require additional activation steps.
            </p>
          </CardContent>
        </Card>

        {/* ── Before You Continue ── */}
        <Card className="glass border-primary/30 dark:border-primary/50 shadow-md transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">
              Before You Continue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground">Please confirm:</p>
            <div className="space-y-3">
              {checklistItems.map((item) => (
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all duration-200 ${
                    checked[item.id]
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-slate-200 bg-card hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                  }`}
                >
                  <Checkbox
                    id={`checkbox-${item.id}`}
                    checked={checked[item.id]}
                    onCheckedChange={() => handleToggle(item.id)}
                    className="shrink-0"
                  />
                  <span
                    className={`text-sm font-medium transition-colors ${
                      checked[item.id] ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-sm text-muted-foreground pt-2 leading-relaxed">
              Once complete, you can safely factory reset your phone and continue with Skyward
              setup.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex justify-end pb-4">
          <Button
            onClick={() => {
              if (isAllChecked) {
                navigate({ to: "/setup" });
              }
            }}
            disabled={!isAllChecked}
            className={`rounded-full px-6 py-5 h-auto transition-all duration-300 shadow-md font-semibold text-sm ${
              isAllChecked
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-[0_8px_24px_-8px_rgba(125,167,217,0.6)] cursor-pointer"
                : "bg-muted text-muted-foreground opacity-60 cursor-not-allowed"
            }`}
          >
            Continue to Setup <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
