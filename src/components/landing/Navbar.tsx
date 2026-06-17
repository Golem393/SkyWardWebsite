import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { createPortalSession } from "@/lib/backend";
import { toast } from "sonner";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const status = profile?.subscription_status ?? "inactive";
  const hasSubscription = status === "active" || status === "past_due";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const initial = (user?.email ?? "?").charAt(0).toUpperCase();

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
        <div className="flex gap-2 items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Account menu"
                >
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {initial === "?" ? <User className="h-4 w-4" /> : initial}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate font-normal text-muted-foreground">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account">Account</Link>
                </DropdownMenuItem>
                {hasSubscription ? (
                  <DropdownMenuItem
                    onSelect={async (e) => {
                      e.preventDefault();
                      try {
                        const { url } = await createPortalSession();
                        window.location.href = url;
                      } catch (err) {
                        toast.error(
                          err instanceof Error ? err.message : "Couldn't open the billing portal.",
                        );
                      }
                    }}
                  >
                    Manage subscription
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to="/onboarding">Start a subscription</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignOut} className="text-destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-4 text-sm font-medium hover:bg-transparent hover:text-primary"
            >
              <Link to="/auth">Login</Link>
            </Button>
          )}
          <Button
            asChild
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-5 h-9 shadow-[0_8px_24px_-8px_rgba(125,167,217,0.6)]"
          >
            <a href="#pricing">Get Skyward</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
