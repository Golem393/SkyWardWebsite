import { ShieldAlert, Ban, RotateCcw, Lock } from "lucide-react";

export function UnbypassableSection() {
  const items = [
    {
      icon: <Ban className="h-6 w-6 text-primary" />,
      title: "No turning off Skyward",
      description:
        "You cannot toggle the blocker off, force-stop the service, or uninstall Skyward when temptation strikes.",
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: "No sideloading apps",
      description:
        "Sideloading APKs is fully blocked. You can't download distracting apps with ADB (Android Debug Bridge) or turn on developer options.",
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-primary" />,
      title: "No factory resetting",
      description:
        "We restrict recovery mode and prevent factory resets. You cannot wipe your device to escape your commitment.",
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28 bg-slate-100 dark:bg-zinc-900/60 border-y border-slate-300 dark:border-zinc-800 relative overflow-hidden">
      {/* Aurora visual decoration */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground leading-tight">
            No willpower required.
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
            Most blockers rely on self-control and can be turned off in a few taps. Skyward uses
            enterprise-grade system controls to block all escape routes.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start p-6 md:p-8 rounded-3xl border border-border/80 bg-card/50 dark:bg-card/10 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_12px_40px_rgba(125,167,217,0.1)] group"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary/20">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
