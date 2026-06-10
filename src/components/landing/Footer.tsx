import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="px-6 pb-12 pt-8 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent" />
            <span className="font-semibold text-foreground -tracking-[0.02em]">Skyward</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A distraction-free smartphone, built for focus.
          </p>
        </div>

        <form
          className="flex w-full max-w-sm items-center gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="you@email.com"
            className="rounded-full bg-card border-border h-11 px-4"
            aria-label="Email address"
          />
          <Button
            type="submit"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-5"
          >
            Follow
          </Button>
        </form>
      </div>
      <div className="max-w-5xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© 2026 Skyward. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
