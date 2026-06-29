import { Smartphone, Settings, ShieldOff } from "lucide-react";

const steps = [
  {
    number: 1,
    Icon: Smartphone,
    title: "Choose an Android phone",
    description: "Use your current phone or a separate Android device.",
  },
  {
    number: 2,
    Icon: Settings,
    title: "Set up Skyward",
    description: "Follow the setup guide.",
  },
  {
    number: 3,
    Icon: ShieldOff,
    title: "Enjoy an addiction-free phone",
    description: "Time-wasting apps are removed while essential apps remain available.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-16 md:py-20 bg-muted/30 dark:bg-muted/10 border-y border-border/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground text-center text-balance">
          Turn your phone into an addiction-free device
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
