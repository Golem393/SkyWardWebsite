import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePostHog } from "@posthog/react";

export function CtaSection() {
  const posthog = usePostHog();

  return (
    <section className="px-6 py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Aurora glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground leading-tight">
          Ready to end your phone addiction?
        </h2>
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto text-balance">
          Take the first step to get your life back.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base font-medium shadow-[0_12px_32px_-10px_rgba(125,167,217,0.7)] group"
            onClick={() => posthog.capture("get_started_clicked", { source: "cta_section" })}
          >
            <Link to="/auth" search={{ mode: "register" }}>
              Activate Skyward for Android
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
