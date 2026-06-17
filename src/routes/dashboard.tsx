import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, RotateCcw, Smartphone, ExternalLink, CheckCircle2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const QR_VALUE = JSON.stringify({
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://play.google.com/managed/downloadManagingApp?identifier=memdm",
  "android.app.extra.PROVISIONING_SKIP_ENCRYPTION": true,
  "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
    "DPM": 1,
    "TV": "wSsVR60j/EH3C60smzP+ce8xmlxdAFL0QUx7ilPy73b+H6/AoMc+kUbKUwDzFPIZQjZrHGQSou8hnx8IgDYM2t0ozFgGWyiF9mqRe1U4J3x197K/xTOdV2k=",
    "Fqdn": "mdm.manageengine.com",
    "CI": true,
    "Port": "443",
    "Token": "c9373a277f3b8639ea61871290ad5cfd",
    "TN": "encapiKey"
  },
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM": "qdbQoq_bFYSbjNMdUf5zuOGxcLqlcML48qP4ZSgpy70=",
  "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": true,
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME": "com.manageengine.mdm.android/com.manageengine.mdm.framework.deviceadmin.DeviceAdminMonitor"
});

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: DashboardPage,
});



// ─── Sub-components ───────────────────────────────────────────────────────────

function StepHeader({
  number,
  icon: Icon,
  title,
  done,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
          done ? "bg-accent/20 text-accent" : "bg-primary/10 text-primary",
        ].join(" ")}
      >
        {done ? <CheckCircle2 className="h-5 w-5" /> : number}
      </div>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-accent" />
        <CardTitle className="text-base text-foreground">{title}</CardTitle>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function DashboardPage() {
  const [step1Checked, setStep1Checked] = useState(false);
  const [step2Checked, setStep2Checked] = useState(false);

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
          {step1Checked && (
            <Card className="animate-in fade-in slide-in-from-top-2 duration-300">
              <CardHeader>
                <StepHeader
                  number={2}
                  icon={RotateCcw}
                  title="Factory Reset Your Phone"
                  done={step2Checked}
                />
              </CardHeader>
              <CardContent className="space-y-5">
                <CardDescription>
                  Choose your device manufacturer and follow the instructions.
                </CardDescription>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="rounded-full gap-2" asChild>
                    <a
                      href="https://www.samsung.com/us/support/answer/ANS00078634/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Samsung Instructions
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  </Button>
                  <Button variant="outline" className="rounded-full gap-2" asChild>
                    <a
                      href="https://support.google.com/pixelphone/answer/2819522"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Instructions
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  </Button>
                  <Button variant="outline" className="rounded-full gap-2" asChild>
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
          )}

          {/* ── Step 3: Install Skyward ── */}
          {step2Checked && (
            <Card className="animate-in fade-in slide-in-from-top-2 duration-300">
              <CardHeader>
                <StepHeader
                  number={3}
                  icon={Smartphone}
                  title="Install Skyward"
                  done={false}
                />
              </CardHeader>
              <CardContent className="space-y-5">
                <CardDescription>
                  Install Skyward using the QR code below. You must be connected
                  to the internet.
                </CardDescription>

                <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted/30 p-8">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <QRCodeSVG value={QR_VALUE} size={208} level="M" />
                  </div>
                  <span className="text-xs text-muted-foreground">Scan during device setup</span>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </main>
    </div>
  );
}
