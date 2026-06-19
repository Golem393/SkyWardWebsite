import { Smartphone, ShieldCheck, Globe, Cpu } from "lucide-react";

export function CompatibilitySection() {
  const brands = ["Samsung", "Google", "Motorola"];

  return (
    <section className="px-6 py-16 md:py-24 bg-card/30 dark:bg-card/10 border-t border-border/50 relative overflow-hidden">
      {/* Subtle aurora background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            Compatibility
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground leading-tight">
            Ready for your device.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Skyward is built on native Android enterprise features to deliver robust, bypass-proof restrictions.
          </p>
        </div>

        {/* 3-Column Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Supported Devices */}
          <div className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[0_4px_16px_-8px_rgba(30,41,59,0.08)] hover:shadow-md transition-all duration-300">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 shrink-0 shadow-sm">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Supported Devices</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Works on phone models from Samsung, Google, or Motorola.
            </p>
          </div>

          {/* Card 2: Android OS */}
          <div className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[0_4px_16px_-8px_rgba(30,41,59,0.08)] hover:shadow-md transition-all duration-300">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 shrink-0 shadow-sm">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Android 11+</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Requires Android 11 or higher
            </p>
          </div>

          {/* Card 3: Worldwide Coverage */}
          <div className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[0_4px_16px_-8px_rgba(30,41,59,0.08)] hover:shadow-md transition-all duration-300">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 shrink-0 shadow-sm">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Works Worldwide</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              You can install Skyward from anywhere in the world
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
