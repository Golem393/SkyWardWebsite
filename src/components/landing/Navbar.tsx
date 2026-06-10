import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      <div
        className={[
          "pointer-events-auto mt-4 flex items-center justify-between transition-all duration-500 ease-out",
          scrolled
            ? "glass mx-4 w-[min(720px,calc(100%-2rem))] rounded-full px-4 py-2 shadow-[0_10px_40px_-20px_rgba(30,41,59,0.18)]"
            : "mx-auto w-[min(1200px,calc(100%-2rem))] rounded-full px-6 py-3 bg-transparent",
        ].join(" ")}
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-block h-7 w-7 rounded-full bg-gradient-to-br from-primary to-accent shadow-inner" />
          <span className="font-semibold text-foreground -tracking-[0.02em]">Skyward</span>
        </a>
        <Button
          asChild
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-5 h-9 shadow-[0_8px_24px_-8px_rgba(125,167,217,0.6)]"
        >
          <a href="#pricing">Get Skyward</a>
        </Button>
      </div>
    </header>
  );
}
