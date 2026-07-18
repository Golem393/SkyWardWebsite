import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { usePostHog } from "@posthog/react";
import { QRCodeSVG } from "qrcode.react";
import {
  AlertTriangle,
  Smartphone,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  BrushCleaning,
  ShieldAlert,
  KeyRound,
  Wifi,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

const QR_VALUE = JSON.stringify({
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
    "https://play.google.com/managed/downloadManagingApp?identifier=memdm",
  "android.app.extra.PROVISIONING_SKIP_ENCRYPTION": true,
  "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
    DPM: 1,
    TV: "wSsVR60j/EH3C60smzP+ce8xmlxdAFL0QUx7ilPy73b+H6/AoMc+kUbKUwDzFPIZQjZrHGQSou8hnx8IgDYM2t0ozFgGWyiF9mqRe1U4J3x197K/xTOdV2k=",
    Fqdn: "mdm.manageengine.com",
    CI: true,
    Port: "443",
    Token: "c9373a277f3b8639ea61871290ad5cfd",
    TN: "encapiKey",
  },
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":
    "qdbQoq_bFYSbjNMdUf5zuOGxcLqlcML48qP4ZSgpy70=",
  "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": true,
  "android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
    "com.manageengine.mdm.android/com.manageengine.mdm.framework.deviceadmin.DeviceAdminMonitor",
});

const DEVICE_STEPS: Record<"Samsung" | "Google" | "Motorola", { title: string; steps: string[] }> =
{
  Samsung: {
    title: "Reset through Settings",
    steps: [
      "Open your phone's Settings app",
      "Tap General management > Reset > Factory data reset",
      "Tap Reset",
      "Tap Delete all",
      "Let your device restart",
    ],
  },
  Google: {
    title: "Reset through Settings",
    steps: [
      "Open your phone's Settings app",
      "Tap System > Reset options > Erase all data (factory reset)",
      "Tap Erase all data",
      "Let your device restart",
    ],
  },
  Motorola: {
    title: "Reset through Settings",
    steps: [
      "Open your phone's Settings app",
      "Tap System > Reset options > Erase all data (factory reset)",
      "Tap Erase all data",
      "Let your device restart",
    ],
  },
};

const BACKUP_DEVICES = [
  {
    name: "Samsung Devices",
    instruction: "Use Samsung Smart Switch to create a backup.",
    path: null,
  },
  {
    name: "Google Pixel",
    instruction: "Use Google's built-in Android Backup.",
    path: "Settings → Google → Backup",
  },
  {
    name: "Motorola",
    instruction: "Use Google's built-in Android Backup.",
    path: "Settings → Google → Backup",
  },
];

function isValidImei(value: string) {
  return /^\d{15}$/.test(value);
}

function DashboardHome() {
  const posthog = usePostHog();
  const { user, profile, refreshProfile } = useAuth();

  const stepsRef = useRef<HTMLDivElement>(null);
  const [deviceState, setDeviceState] = useState<"new" | "existing" | null>(null);
  const [imei, setImei] = useState("");
  const [savingImei, setSavingImei] = useState(false);
  const [imeiSaved, setImeiSaved] = useState(false);

  const [deviceType, setDeviceType] = useState<"Samsung" | "Google" | "Motorola" | null>(null);
  const [resetConfirmed, setResetConfirmed] = useState(false);

  useEffect(() => {
    if (profile?.imei) {
      setImei(profile.imei);
      setImeiSaved(true);
    }
  }, [profile?.imei]);

  useEffect(() => {
    if (profile?.new_existing_device && !deviceState) {
      setDeviceState(profile.new_existing_device as "new" | "existing");
    }
  }, [profile?.new_existing_device]);

  const handleSetDeviceState = async (state: "new" | "existing") => {
    setDeviceState(state);

    // Scroll to the next step, primarily helpful for mobile users
    setTimeout(() => {
      stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    if (!user) return;
    const { error } = await supabase.from("profiles").update({ new_existing_device: state }).eq("id", user.id);
    if (error) {
      toast.error(`Couldn't save selection: ${error.message}`);
    }
  };

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
    setImeiSaved(true);
  };

  const renderBackupModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-auto gap-2 rounded-full border-amber-500 text-amber-700 hover:text-amber-700 hover:bg-amber-500/10 dark:border-amber-500 dark:text-amber-400 dark:hover:text-amber-400 dark:hover:bg-amber-500/20 shadow-sm"
        >
          <ShieldAlert className="h-4 w-4" />
          View Backup Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Backup Instructions
          </DialogTitle>
          <DialogDescription>
            Please ensure you backup everything before factory resetting.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2 rounded-xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 p-4">
            <h4 className="font-semibold text-sm text-red-800 dark:text-red-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> What you will lose
            </h4>
            <p className="text-xs text-red-700/90 dark:text-red-400/90 mb-2">
              A factory reset will permanently erase all data. Make sure you have backed up:
            </p>
            <ul className="text-xs text-red-700/90 dark:text-red-400/90 list-disc list-inside space-y-1 ml-1">
              <li>Photos and videos</li>
              <li>Contacts and call history</li>
              <li>Text messages (SMS/MMS) and chat apps</li>
              <li>Authenticator app codes (2FA)</li>
              <li>Crypto wallets and private keys</li>
              <li>Notes and voice memos</li>
              <li>Local game saves</li>
              <li>eSIM profiles</li>
              <li>Downloaded files and documents</li>
              <li>Passwords and app logins</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" /> Device Backup
            </h4>
            {BACKUP_DEVICES.map((d) => (
              <div key={d.name} className="rounded-xl bg-muted/50 p-3 space-y-1">
                <p className="text-sm font-medium">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.instruction}</p>
                {d.path && (
                  <p className="text-xs font-mono text-muted-foreground bg-background rounded px-1.5 py-0.5 inline-block mt-1">
                    {d.path}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-primary" /> Authenticator Apps
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If you use Google Authenticator, Authy, or Duo Mobile, make sure your accounts are
              exported or backed up. You will lose access to 2FA codes if you skip this!
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If you use WhatsApp, make sure to manually back up your chat history to Google Drive in the app settings before resetting.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
              <Wifi className="h-4 w-4 text-primary" /> eSIM Users
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Verify that you know how to reactivate your mobile service after the reset.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="py-8 px-4 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your Skyward devices and settings.</p>
      </div>

      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-lg font-medium text-foreground">Let's set up your device</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleSetDeviceState("new")}
            className={`group text-left relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 ${deviceState === "new" ? "border-primary ring-1 ring-primary" : ""
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Smartphone className="h-5 w-5" />
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-foreground">Brand New Device</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Setting up a phone straight out of the box. No factory reset needed.
            </p>
          </button>

          <button
            onClick={() => handleSetDeviceState("existing")}
            className={`group text-left relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 ${deviceState === "existing" ? "border-primary ring-1 ring-primary" : ""
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <BrushCleaning className="h-5 w-5" />
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-foreground">Existing Device</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Converting a phone you already use. Requires backing up data and a factory reset.
            </p>
          </button>
        </div>
      </div>

      <div ref={stepsRef} className="scroll-mt-28" />
      {(deviceState || imeiSaved) && (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Step 1: Link Device (IMEI) */}
          <Card
            className={
              imeiSaved ? "border-emerald-500/20 bg-emerald-50/10 dark:bg-emerald-950/10" : ""
            }
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Step 1: Link your device</CardTitle>
                  <CardDescription className="mt-1">
                    Find your device's 15-digit IMEI by opening the phone app and dialing{" "}
                    <span className="font-medium text-foreground">*#06#</span>.
                  </CardDescription>
                </div>
                {imeiSaved && <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex max-w-sm gap-2">
                <Input
                  id="imei"
                  inputMode="numeric"
                  placeholder="15-digit IMEI"
                  value={imei}
                  onChange={(e) => setImei(e.target.value.replace(/\D/g, "").slice(0, 15))}
                  maxLength={15}
                  disabled={imeiSaved}
                  className={imeiSaved ? "bg-muted/50" : ""}
                />
                {!imeiSaved ? (
                  <Button onClick={handleSaveImei} disabled={savingImei || imei.length !== 15}>
                    {savingImei ? "Saving…" : "Save IMEI"}
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setImeiSaved(false)}>
                    Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Instructions */}
          {imeiSaved && (
            <div className="space-y-6 animate-in slide-in-from-top-4 fade-in duration-500">
              {deviceState === "existing" && (
                <>
                  <Card className="border-amber-200/50 bg-gradient-to-br from-amber-500/5 to-transparent dark:from-amber-500/10 dark:border-amber-900/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        Step 2: Backing up data
                      </CardTitle>
                      <CardDescription className="text-amber-900/70 dark:text-amber-200/70">
                        Before installing Skyward, you must factory reset your phone. This permanently
                        erases all unbacked-up data. Please back up your data now.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderBackupModal()}
                    </CardContent>
                  </Card>

                  <Card className="border-red-200/50 bg-gradient-to-br from-red-500/5 to-transparent dark:from-red-500/10 dark:border-red-900/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Step 3: Factory Reset
                      </CardTitle>
                      <CardDescription className="text-red-900/70 dark:text-red-200/70">
                        Select your device brand for reset instructions.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {(["Samsung", "Google", "Motorola"] as const).map((d) => (
                            <button
                              key={d}
                              onClick={() => setDeviceType(d)}
                              className={[
                                "flex items-center justify-center gap-2 rounded-xl border-2 p-3 text-sm font-semibold transition-all duration-200 hover:shadow-sm",
                                deviceType === d
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted/50 hover:text-foreground",
                              ].join(" ")}
                            >
                              <Smartphone
                                className={`h-4 w-4 transition-colors ${deviceType === d ? "text-primary" : "text-muted-foreground"
                                  }`}
                              />
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>

                      {deviceType && (
                        <div className="rounded-xl bg-background/50 p-4 border border-border/50 space-y-3 animate-in fade-in duration-300">
                          <p className="text-sm font-medium">{DEVICE_STEPS[deviceType].title}</p>
                          <ol className="space-y-2">
                            {DEVICE_STEPS[deviceType].steps.map((step, i) => (
                              <li key={i} className="flex gap-3">
                                <span className="flex h-5 items-center shrink-0">
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                                    {i + 1}
                                  </span>
                                </span>
                                <span className="text-sm leading-5 text-foreground">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 transition-colors hover:bg-muted/50">
                        <Checkbox
                          checked={resetConfirmed}
                          onCheckedChange={(v) => {
                            setResetConfirmed(Boolean(v));
                            if (v)
                              posthog.capture("setup_factory_reset_confirmed", {
                                device: deviceType,
                              });
                          }}
                          className="mt-0.5 shrink-0"
                          disabled={!deviceType}
                        />
                        <span className="text-sm text-foreground leading-snug">
                          I have successfully factory reset my phone.
                        </span>
                      </label>
                    </CardContent>
                  </Card>
                </>
              )}

              {(deviceState === "new" || resetConfirmed || (!deviceState && imeiSaved)) && (
                <>
                  <Card className="border-primary/20 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {deviceState === "existing" ? "Step 4: Install Skyward" : "Step 2: Install Skyward"}
                      </CardTitle>
                      <CardDescription>
                        Scan the QR code. You must be connected to Wi-Fi.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 space-y-4">
                          <div className="flex gap-3">
                            <div className="flex h-6 items-center shrink-0">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                1
                              </div>
                            </div>
                            <p className="text-sm leading-6 text-foreground">
                              Turn on your device so it shows the "Welcome" or "Let's Go" screen.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex h-6 items-center shrink-0">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                2
                              </div>
                            </div>
                            <p className="text-sm leading-6 text-foreground">
                              Tap an empty space on the screen{" "}
                              <span className="font-semibold text-primary">6 times in a row</span>.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex h-6 items-center shrink-0">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                3
                              </div>
                            </div>
                            <p className="text-sm leading-6 text-foreground">
                              A QR scanner will open. Scan the QR code shown here.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex h-6 items-center shrink-0">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                4
                              </div>
                            </div>
                            <p className="text-sm leading-6 text-foreground">
                              Follow the on-screen prompts to connect to Wi-Fi and complete the
                              installation.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-muted/30 p-6">
                          <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
                            <QRCodeSVG value={QR_VALUE} size={180} level="M" />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Provisioning QR
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {deviceState === "existing" ? "Step 5: Onboarding" : "Step 3: Onboarding"}
                      </CardTitle>
                      <CardDescription>
                        Complete the final setup steps on your device.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col space-y-4">
                        <div className="flex gap-3">
                          <div className="flex h-6 items-center shrink-0">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              1
                            </div>
                          </div>
                          <p className="text-sm leading-6 text-foreground">
                            Once the Skyward app is open, log in with your account.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-6 items-center shrink-0">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              2
                            </div>
                          </div>
                          <p className="text-sm leading-6 text-foreground">
                            Enable accessibility settings for Skyward when prompted.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-6 items-center shrink-0">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              3
                            </div>
                          </div>
                          <p className="text-sm leading-6 text-foreground">
                            Configure the private DNS provider hostname. Use the value 1w2whn92y8e.dns.controld.com
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-6 items-center shrink-0">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              4
                            </div>
                          </div>
                          <p className="text-sm leading-6 text-foreground">
                            Skyward will now be ready to use!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
