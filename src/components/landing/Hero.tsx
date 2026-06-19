import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative aurora min-h-screen flex items-center justify-center overflow-hidden px-6"
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
          className="text-4xl sm:text-5xl md:text-6xl font-semibold -tracking-[0.02em] leading-[1.05] text-balance text-foreground animate-fade-in"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          Tried a dumbphone? This is what actually works.
        </h1>
        <p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-in"
          style={{ animationDelay: "260ms", animationFillMode: "both" }}
        >
          Skyward turns your Android phone into a focused device by removing addictive apps and making it harder to fall back into scrolling.
        </p>
      </div>
    </section>
  );
}
