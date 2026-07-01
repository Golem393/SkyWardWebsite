import { RotateCcw, ShoppingBag, Smartphone, HelpCircle, QrCode } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HowItWorks() {
  return (
    <section className="px-6 py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Background blur */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground leading-tight text-balance">
            How to lock down your phone.
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
            To prevent you from bypassing Skyward&apos;s restrictions, we use mobile device
            management — the same tool corporations use to lock down company devices.
          </p>
        </div>

        {/* Two options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Option 1 */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-[0_4px_24px_-8px_rgba(30,41,59,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(30,41,59,0.12)] transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/3 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-primary">
                  Option 1
                </span>
                <h3 className="text-lg font-semibold text-foreground leading-tight mt-0.5">
                  Buy a new or used device
                </h3>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              {[
                "Pick up an Android phone from a local store or online retailer",
                "Scan the QR code from Skyward — no factory reset needed",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-[22px] w-6 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                  </div>
                  <div className="text-sm text-foreground leading-relaxed">{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Option 2 */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-[0_4px_24px_-8px_rgba(30,41,59,0.08)] hover:shadow-[0_8px_32px_-8px_rgba(30,41,59,0.12)] transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/3 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-primary">
                  Option 2
                </span>
                <h3 className="text-lg font-semibold text-foreground leading-tight mt-0.5">
                  Convert your current Android
                </h3>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              {[
                "Back up your phone's data",
                "Factory reset the device",
                "Scan the QR code from Skyward upon reboot",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-[22px] w-6 shrink-0 items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                  </div>
                  <div className="text-sm text-foreground leading-relaxed">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ cards */}
        <div className="mt-8 space-y-4">
          {/* Why factory reset */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base mb-2">
                  Why is factory resetting required for option #2?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You need to give Skyward permission to become a{" "}
                  <span className="text-foreground font-semibold">device owner</span> — a
                  system-level role that helps us lock down your device. This permission can only be
                  granted during a new phone setup.
                </p>
              </div>
            </div>
          </div>

          {/* Compatible phones */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base mb-2">
                  Which phones are compatible?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">
                    Samsung, Google Pixel, and Motorola
                  </span>{" "}
                  phones running{" "}
                  <span className="text-foreground font-semibold">Android 11 or higher</span> are
                  all supported.
                </p>
                <p className="text-sm font-semibold text-foreground mt-4">Phones that work:</p>
                <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 items-center shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    <span>
                      <strong className="text-foreground font-semibold">Samsung Galaxy:</strong> All S Series (S10 or newer), A Series (A10 or newer), Z series foldables (Z Flip/Fold 2 or newer), and Note Series (Note 10 or newer)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 items-center shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    <span>
                      <strong className="text-foreground font-semibold">Google Pixel:</strong> All Pixel Series (Pixel 2 or newer)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 items-center shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    <span>
                      <strong className="text-foreground font-semibold">Motorola:</strong> All Razr Series (2019 or newer), Edge Series (2020 or newer), Moto G Series (G8 or newer)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
