import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePostHog } from "@posthog/react";

export function Hero() {
  const posthog = usePostHog();

  return (
    <section
      id="top"
      className="relative aurora min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      <div className="relative z-10 max-w-4xl text-center">
        {/*<div
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-8 animate-fade-in"
          style={{ animationDelay: "0ms", animationFillMode: "both" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          The app blocker that can't be easily bypassed
        </div>*/}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-semibold -tracking-[0.02em] leading-[1.05] text-balance text-foreground animate-fade-in"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          The middle ground between a smartphone and a dumbphone
        </h1>
        <p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-in"
          style={{ animationDelay: "260ms", animationFillMode: "both" }}
        >
          Skyward blocks all social media, games, porn, & other addictive apps from your Android
          phone - with no way to bypass the restrictions.
        </p>
      </div>
    </section>
  );
}
