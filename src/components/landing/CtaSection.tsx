import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePostHog } from "@posthog/react";

export function CtaSection() {
  const posthog = usePostHog();

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground">
          Ready to break free?
        </h2>
        <div className="mt-8">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base font-medium shadow-[0_12px_32px_-10px_rgba(125,167,217,0.7)] group"
            onClick={() =>
              posthog.capture("get_started_clicked", { source: "cta_section" })
            }
          >
            <Link to="/auth" search={{ mode: "register" }}>
              Get started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
