import { HardDriveDownload, RotateCcw, Smartphone, AlertTriangle } from "lucide-react";

const steps = [
  {
    number: 1,
    Icon: HardDriveDownload,
    title: "Back Up Your Data",
    description: "Use Skyward's backup guide to save important data.",
    warning: {
      headline: "Do not factory reset your phone before following Skyward's backup guide.",
      body: "We'll provide step-by-step instructions after purchase to help you safely back up important data.",
    },
  },
  {
    number: 2,
    Icon: RotateCcw,
    title: "Factory Reset Your Phone",
    description: "Reset your device after completing the backup.",
  },
  {
    number: 3,
    Icon: Smartphone,
    title: "Install Skyward",
    description:
      "Follow the setup guide to finish transforming your phone into a distraction-free device.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">
          How Skyward Works
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground text-center text-balance">
          Here's what the process looks like.
        </h2>

        <ol className="mt-12 space-y-6">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-[0_4px_16px_-8px_rgba(30,41,59,0.08)]"
            >
              {/* Step number + icon */}
              <div className="flex flex-col items-center gap-2 pt-0.5 shrink-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {step.number}
                </span>
                <step.Icon className="h-5 w-5 text-accent" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>

                {step.warning && (
                  <div className="flex gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
                    <div className="space-y-1 text-sm">
                      <p className="font-medium text-foreground">{step.warning.headline}</p>
                      <p className="text-muted-foreground">{step.warning.body}</p>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
