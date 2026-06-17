import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Smartphone,
  KeyRound,
  AppWindow,
  Wifi,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/backup")({
  ssr: false,
  component: BackupGuidePage,
});

// ─── Data ────────────────────────────────────────────────────────────────────

const BACKUP_SECTIONS = [
  {
    id: "backup",
    Icon: Smartphone,
    title: "Recommended: Create a Full Device Backup",
    intro:
      "Before continuing, we strongly recommend creating a full backup of your phone.",
    devices: [
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
    ],
  },
];

const AUTHENTICATOR_APPS = [
  "Google Authenticator",
  "Microsoft Authenticator",
  "Authy",
  "Duo Mobile",
];

const IMPORTANT_APPS = [
  "Messaging apps (WhatsApp, Signal, Telegram)",
  "Note-taking apps",
  "Banking apps",
  "Work accounts",
  "Fitness or habit tracking apps",
];

const CHECKLIST = [
  "Full device backup completed",
  "Authenticator accounts backed up or transferred",
  "Google account email and password verified",
  "Important apps checked",
  "eSIM information verified (if applicable)",
];

// ─── Component ───────────────────────────────────────────────────────────────

function BackupGuidePage() {
  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto w-full max-w-2xl space-y-10">

        {/* Back link */}
        <div className="-ml-1">
          <Button variant="ghost" asChild className="text-muted-foreground rounded-full">
            <Link to="/success">← Back</Link>
          </Button>
        </div>

        {/* Page header */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Setup Guide
          </p>
          <h1 className="text-3xl font-semibold -tracking-[0.02em] text-foreground">
            Factory Reset Preparation Guide
          </h1>
          <p className="text-muted-foreground">
            Before setting up Skyward, you'll need to factory reset your Android
            device.
          </p>
          <div className="flex gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
            <p className="text-sm text-muted-foreground">
              A factory reset permanently removes apps, accounts, photos,
              messages, and other data stored on the device. Skyward cannot
              recover any data that is erased during this process.
            </p>
          </div>
        </div>

        {/* ── Section 1: Full Device Backup ── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-accent" />
              <CardTitle className="text-base">
                Recommended: Create a Full Device Backup
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Before continuing, we strongly recommend creating a full backup of
              your phone.
            </p>
            <div className="space-y-3">
              {BACKUP_SECTIONS[0].devices.map((d) => (
                <div
                  key={d.name}
                  className="rounded-xl border border-border bg-card px-4 py-3 space-y-1"
                >
                  <p className="text-sm font-medium text-foreground">{d.name}</p>
                  <p className="text-sm text-muted-foreground">{d.instruction}</p>
                  {d.path && (
                    <p className="text-xs font-mono text-muted-foreground bg-muted/60 rounded px-2 py-0.5 inline-block">
                      {d.path}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Section 2: Authenticator Apps ── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-accent" />
              <CardTitle className="text-base">
                Important: Verify Your Authenticator Apps
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-medium text-foreground">
              This is the most commonly forgotten step.
            </p>
            <p className="text-sm text-muted-foreground">
              If you use any of the following, make sure your accounts have been
              exported, transferred, or backed up before resetting your phone.
            </p>
            <ul className="space-y-2">
              {AUTHENTICATOR_APPS.map((app) => (
                <li key={app} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {app}
                </li>
              ))}
            </ul>
            <div className="flex gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
              <p className="text-sm text-muted-foreground">
                Many users lose access to important accounts because they skip
                this step.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Section 3: Google Account ── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <KeyRound className="h-5 w-5 text-accent" />
              <CardTitle className="text-base">
                Verify Access to Your Google Account
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              After a factory reset, Android may require you to sign in using
              the Google account previously used on the device. Before
              continuing, confirm:
            </p>
            <ul className="space-y-2">
              {[
                "You know your Google email address.",
                "You know your Google password.",
                "You can successfully sign in to your Google account.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ── Section 4: Important Apps ── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AppWindow className="h-5 w-5 text-accent" />
              <CardTitle className="text-base">Check Important Apps</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you use apps that contain important personal information, verify
              they are backed up or synced.
            </p>
            <ul className="space-y-2">
              {IMPORTANT_APPS.map((app) => (
                <li key={app} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {app}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ── Section 5: eSIM ── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Wifi className="h-5 w-5 text-accent" />
              <CardTitle className="text-base">eSIM Users</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              If your phone uses an eSIM, verify that you know how to reactivate
              your mobile service after the reset.
            </p>
            <p className="text-sm text-muted-foreground">
              Some carriers may require additional activation steps.
            </p>
          </CardContent>
        </Card>

        {/* ── Final Checklist ── */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold -tracking-[0.02em] text-foreground">
            Final Checklist
          </h2>
          <p className="text-sm text-muted-foreground">
            Before factory resetting, confirm:
          </p>
          <ul className="space-y-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground pt-2">
            Once all items are complete, you can safely factory reset your
            device and continue with Skyward setup.
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-end pb-4">
          <Button asChild className="rounded-full">
            <Link to="/account">
              Continue to Setup <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
