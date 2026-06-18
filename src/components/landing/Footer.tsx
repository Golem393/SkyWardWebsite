import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="px-6 pb-12 pt-8 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Skyward" className="h-6 w-6 object-contain" />
            <span className="font-semibold text-foreground -tracking-[0.02em]">Skyward</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Turn your smartphone into a distraction-free device.
          </p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© 2026 Skyward. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <a href="mailto:hello@skywardos.com" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
