import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, RotateCcw, Smartphone, ExternalLink, CheckCircle2, Lock } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { EnrollmentQr } from "@/components/EnrollmentQr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: DashboardPage,
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface StepState {
  checked: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepHeader({
  number,
  icon: Icon,
  title,
  locked,
  done,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  locked: boolean;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      {/* Step badge */}
      <div
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
          done
            ? "bg-accent/20 text-accent"
            : locked
            ? "bg-muted text-muted-foreground"
            : "bg-primary/10 text-primary",
        ].join(" ")}
      >
        {done ? <CheckCircle2 className="h-5 w-5" /> : number}
      </div>

      {/* Icon + title */}
      <div className="flex items-center gap-2">
        <Icon
          className={[
            "h-5 w-5 transition-colors",
            locked ? "text-muted-foreground" : "text-accent",
          ].join(" ")}
        />
        <CardTitle
          className={[
            "text-base transition-colors",
            locked ? "text-muted-foreground" : "text-foreground",
          ].join(" ")}
        >
          {title}
        </CardTitle>
      </div>

      {locked && (
        <Lock className="ml-auto h-4 w-4 text-muted-foreground/50 shrink-0" />
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function DashboardPage() {
  const { profile } = useAuth();

  const [step1Checked, setStep1Checked] = useState(false);
  const [step2Checked, setStep2Checked] = useState(false);

  const step2Unlocked = step1Checked;
  const step3Unlocked = step1Checked && step2Checked;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto w-full max-w-2xl px-4 pb-24 pt-32">
        {/* Page heading */}
        <div className="mb-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Getting Started
          </p>
          <h1 className="text-3xl font-semibold -tracking-[0.02em] text-foreground">
            Setup Skyward
          </h1>
          <p className="text-sm text-muted-foreground">
            Follow the steps below to prepare your phone and install Skyward.
          </p>
        </div>

        <div className="space-y-5">

          {/* ── Step 1: Back Up Your Data ── */}
          <Card>
            <CardHeader>
              <StepHeader
                number={1}
                icon={BookOpen}
                title="Back Up Your Data"
                locked={false}
                done={step1Checked}
              />
            </CardHeader>
            <CardContent className="space-y-5">
              <CardDescription>
                Factory resetting your phone permanently erases any data that
                has not been backed up.
              </CardDescription>

              <Button asChild variant="outline" className="rounded-full gap-2">
                <Link to="/backup">
                  <BookOpen className="h-4 w-4" />
                  Open Backup Guide
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              </Button>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50">
                <Checkbox
                  id="step1-check"
                  checked={step1Checked}
                  onCheckedChange={(v) => setStep1Checked(Boolean(v))}
                  className="mt-0.5 shrink-0"
                />
                <span className="text-sm text-foreground leading-snug">
                  I understand that a factory reset will permanently erase data
                  that has not been backed up.
                </span>
              </label>
            </CardContent>
          </Card>

          {/* ── Step 2: Factory Reset ── */}
          <Card className={!step2Unlocked ? "opacity-50 pointer-events-none select-none" : ""}>
            <CardHeader>
              <StepHeader
                number={2}
                icon={RotateCcw}
                title="Factory Reset Your Phone"
                locked={!step2Unlocked}
                done={step2Checked}
              />
            </CardHeader>
            <CardContent className="space-y-5">
              <CardDescription>
                Choose your device manufacturer and follow the instructions.
              </CardDescription>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="rounded-full gap-2"
                  asChild
                >
                  <a
                    href="https://www.samsung.com/us/support/answer/ANS00078634/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Samsung Instructions
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full gap-2"
                  asChild
                >
                  <a
                    href="https://support.google.com/pixelphone/answer/2819522"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Instructions
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full gap-2"
                  asChild
                >
                  <a
                    href="https://www.motorola.com/us/hard-reset-motorola-phone/p"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Motorola Instructions
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                After completing the factory reset, return here and continue.
              </p>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50">
                <Checkbox
                  id="step2-check"
                  checked={step2Checked}
                  onCheckedChange={(v) => setStep2Checked(Boolean(v))}
                  className="mt-0.5 shrink-0"
                />
                <span className="text-sm text-foreground leading-snug">
                  I have successfully factory reset my phone.
                </span>
              </label>
            </CardContent>
          </Card>

          {/* ── Step 3: Install Skyward ── */}
          <Card className={!step3Unlocked ? "opacity-50 pointer-events-none select-none" : ""}>
            <CardHeader>
              <StepHeader
                number={3}
                icon={Smartphone}
                title="Install Skyward"
                locked={!step3Unlocked}
                done={false}
              />
            </CardHeader>
            <CardContent className="space-y-5">
              <CardDescription>
                Install Skyward using the QR code below. You must be connected
                to the internet.
              </CardDescription>

              <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/30 p-8">
                <EnrollmentQr imei={profile?.imei} />
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
