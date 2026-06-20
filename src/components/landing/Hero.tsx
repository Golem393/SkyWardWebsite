import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
          className="text-3xl sm:text-4xl md:text-5xl font-semibold -tracking-[0.02em] leading-[1.05] text-balance text-foreground animate-fade-in"
          style={{ animationDelay: "120ms", animationFillMode: "both" }}
        >
          Like a dumbphone, but with the apps you still need
        </h1>
        <p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance animate-fade-in"
          style={{ animationDelay: "260ms", animationFillMode: "both" }}
        >
          Skyward removes social media, games, porn, & other addictive apps from your Android phone.
        </p>
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base font-medium shadow-[0_12px_32px_-10px_rgba(125,167,217,0.7)] group"
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
