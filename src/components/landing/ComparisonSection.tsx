import { Smartphone, ShieldAlert, ShieldCheck, X, Check } from "lucide-react";

export function ComparisonSection() {
  return (
    <section className="px-6 pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden bg-background">
      {/* Subtle background aurora effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            The Alternative
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold -tracking-[0.02em] text-foreground leading-tight">
            How we're different.
          </h2>
          <div className="mt-6 space-y-4 max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Most people try dumbphones or simple app blockers until they realize that neither works for them.
            </p>
          </div>
        </div>

        {/* 3-Column Comparative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch max-w-6xl mx-auto pt-4">
          {/* Dumbphones Column */}
          <div className="flex flex-col rounded-3xl border border-border/80 bg-card/30 dark:bg-card/10 backdrop-blur-md p-6 md:p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-border hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/50">
              <div className="h-10 w-10 rounded-xl bg-red-500/5 text-red-500 flex items-center justify-center shrink-0">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Dumbphones</h3>
                <p className="text-xs text-red-500 font-medium">Too restrictive</p>
              </div>
            </div>

            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>Too restrictive for real life</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>You end up needing your smartphone anyway</span>
              </li>
            </ul>
          </div>

          {/* Skyward Column (Highlighted) */}
          <div className="flex flex-col rounded-3xl border-2 border-primary bg-primary/[0.03] dark:bg-primary/[0.01] backdrop-blur-md p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(125,167,217,0.3)] relative lg:-translate-y-2 lg:scale-105 z-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold bg-primary text-primary-foreground shadow-sm">
              The Middle Ground
            </div>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-primary/20">
              <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(125,167,217,0.5)]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Skyward</h3>
                <p className="text-xs text-primary font-semibold">Perfect balance</p>
              </div>
            </div>

            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Keeps essential apps working, addictive apps blocked</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-foreground font-medium">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Complete lock down of your device</span>
              </li>
            </ul>
          </div>

          {/* App Blockers Column */}
          <div className="flex flex-col rounded-3xl border border-border/80 bg-card/30 dark:bg-card/10 backdrop-blur-md p-6 md:p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-border hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/50">
              <div className="h-10 w-10 rounded-xl bg-red-500/5 text-red-500 flex items-center justify-center shrink-0">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Smartphones</h3>
                <p className="text-xs text-red-500 font-medium">Easy to bypass</p>
              </div>
            </div>

            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>Uninstalled apps can be downloaded again</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>Easy to disable app blockers when cravings hit</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
