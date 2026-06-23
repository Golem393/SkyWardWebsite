export function DemoVideo() {
  return (
    <section
      id="demo"
      className="px-6 py-20 md:py-28 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(125,167,217,0.13), transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-semibold -tracking-[0.02em] text-foreground text-balance">
          Watch the demo
        </h2>
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto text-balance">
          See how Skyward works
        </p>

        {/* Video embed */}
        <div className="mt-12 relative rounded-2xl overflow-hidden shadow-[0_24px_64px_-16px_rgba(125,167,217,0.35)] border border-border/60 ring-1 ring-border/30 bg-black">
          {/* 16:9 aspect ratio wrapper */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              id="demo-video-iframe"
              src="https://www.youtube.com/embed/3p9njLrek0k?rel=0&modestbranding=1&color=white"
              title="Skyward product demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
