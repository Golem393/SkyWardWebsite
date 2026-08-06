import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/download")({
  ssr: false,
  component: DownloadPage,
});

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Platform = "windows-x86_64" | "darwin-aarch64" | "linux-x86_64";

type Release = {
  version: string;
  downloads: { target: Platform; label: string; detail: string; url: string }[];
};

/** Which download to feature. Only a guess — every platform stays listed either way. */
function detectPlatform(): Platform | null {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows-x86_64";
  if (ua.includes("mac")) return "darwin-aarch64";
  // After Android, whose user agent also contains "linux".
  if (ua.includes("android")) return null;
  if (ua.includes("linux") || ua.includes("x11")) return "linux-x86_64";
  return null;
}

/** Shown under the featured button, since the installers are unsigned. */
const NOTES: Record<Platform, string> = {
  "windows-x86_64": "If Windows shows a warning, click More info, then Run anyway.",
  "darwin-aarch64": "If macOS blocks it, right-click the app and choose Open.",
  "linux-x86_64": "Run chmod +x on the file to make it executable.",
};

function DownloadPage() {
  const [release, setRelease] = useState<Release | null>(null);
  const [failed, setFailed] = useState(false);
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
    fetch(`${BACKEND_URL}/api/desktop/downloads`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setRelease)
      .catch(() => setFailed(true));
  }, []);

  const featured = release?.downloads.find((d) => d.target === platform) ?? null;
  const others = release?.downloads.filter((d) => d !== featured) ?? [];

  return (
    <div className="min-h-screen bg-background aurora flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="mx-auto w-full max-w-lg px-4 pb-24 pt-32 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Desktop App
          </p>
          <h1 className="mt-2 text-3xl font-semibold -tracking-[0.02em] text-foreground">
            Download Skyward
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Connect your phone to your computer and Skyward sets it up for you. Nothing else
            to install.
          </p>

          <div className="mt-10 space-y-4">
            {failed && (
              <p className="text-sm text-muted-foreground">
                Downloads are unavailable right now. Please try again shortly.
              </p>
            )}

            {!failed && !release && (
              <div className="h-12 animate-pulse rounded-full bg-muted/50" aria-hidden />
            )}

            {featured && (
              <>
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full rounded-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href={featured.url} download>
                    <Download className="h-5 w-5" />
                    Download for {featured.label}
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">{featured.detail}</p>
              </>
            )}

            {others.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2">
                {others.map((d) => (
                  <a
                    key={d.target}
                    href={d.url}
                    download
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {d.label}
                  </a>
                ))}
              </div>
            )}

            {release && (
              <p className="pt-2 text-xs text-muted-foreground">
                Version {release.version}
                {featured ? ` · ${NOTES[featured.target]}` : ""}
              </p>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
