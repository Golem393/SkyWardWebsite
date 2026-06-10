import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative aurora min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      <div className="relative z-10 max-w-4xl text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-8 animate-fade-in"
          style={{ animationDelay: "0ms", animationFillMode: "both" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          A distraction-free smartphone
        </div>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-semibold -tracking-[0.02em] leading-[1.05] text-balance text-foreground animate-fade-in"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          Your smartphone, without time-wasting apps.
        </h1>
        <p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-in"
          style={{ animationDelay: "260ms", animationFillMode: "both" }}
        >
          Skyward removes most social media, games, dating apps, and porn from your device.
          You can&apos;t access it unless you&apos;re an elite hacker.
        </p>
        <div
          className="mt-10 flex items-center justify-center gap-3 animate-fade-in"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          <Button
            asChild
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 shadow-[0_12px_32px_-10px_rgba(125,167,217,0.7)]"
          >
            <a href="#pricing">
              Get Skyward <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="rounded-full h-12 px-6 text-foreground hover:bg-white/60"
          >
            <a href="#faq">Learn more</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
