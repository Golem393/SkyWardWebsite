import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePostHog } from "@posthog/react";

export function Hero() {
  const posthog = usePostHog();

  return (
    <section
      id="top"
      className="relative aurora pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden min-h-screen flex items-center"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

          {/* Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 lg:col-span-7 lg:text-left text-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance animate-fade-in"
              style={{ animationDelay: "120ms", animationFillMode: "both" }}
            >
              The middle ground between a smartphone and a dumbphone
            </h1>
            <p
              className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground text-balance animate-fade-in lg:pr-8 mx-auto lg:mx-0 max-w-xl"
              style={{ animationDelay: "260ms", animationFillMode: "both" }}
            >
              Skyward blocks social media, games, porn, & other addictive apps from your Android
              phone - with no easy way to bypass the restrictions.
            </p>
            <div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in"
              style={{ animationDelay: "400ms", animationFillMode: "both" }}
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-14 text-lg font-medium shadow-xl shadow-primary/20 transition-all hover:scale-105 group"
                onClick={() => posthog.capture("get_started_clicked", { source: "hero" })}
              >
                <Link to="/auth" search={{ mode: "register" }}>
                  Start a free trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-5 flex justify-center lg:justify-center relative">
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] xl:max-w-[560px] flex justify-center">
              <img
                src="/phone-mockup.png"
                alt="Skyward Phone Mockup"
                className="w-full h-auto object-contain animate-fade-in -my-12 lg:-my-32"
                style={{ animationDelay: "500ms", animationFillMode: "both" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
