import { CreditCard, ClipboardList, Smartphone, User } from "lucide-react";

const steps = [
  {
    number: 1,
    Icon: User,
    title: "Get Skyward",
    description: "Make an account and purchase a monthly or annual plan.",
  },
  {
    number: 2,
    Icon: ClipboardList,
    title: "Reset your phone (or get a 2nd device)",
    description: "Back up your data and factory reset your current Android phone or get a compatible spare phone.",
  },
  {
    number: 3,
    Icon: Smartphone,
    title: "Scan a QR Code",
    description: "Skyward will transform your phone into a distraction-free device.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-16 md:py-20 bg-muted/30 dark:bg-muted/10 border-y border-border/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">
          Setup Process
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground text-center text-balance">
          How Skyward Works
        </h2>

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col items-start rounded-2xl border border-border bg-card p-6 shadow-[0_4px_16px_-8px_rgba(30,41,59,0.08)] hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
            >
              {/* Card Header (Large Step Number + Framed Icon) */}
              <div className="flex items-center justify-between w-full mb-6">
                <span className="text-4xl font-bold text-primary/30 tracking-tight select-none">
                  0{step.number}
                </span>
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <step.Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
