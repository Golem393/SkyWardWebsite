import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { User, Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
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

  // Close mobile menu on navigation
  const closeMobile = () => setMobileOpen(false);

  const handleSignOut = async () => {
    closeMobile();
    await signOut();
    navigate({ to: "/" });
  };

  const initial = (user?.email ?? "?").charAt(0).toUpperCase();

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      {/* Desktop / scrolled pill */}
      <div
        className={[
          "relative z-10 pointer-events-auto mt-4 flex items-center justify-between transition-all duration-500 ease-out",
          scrolled && !mobileOpen
            ? "glass mx-4 w-[min(720px,calc(100%-2rem))] rounded-full px-4 py-2 shadow-[0_10px_40px_-20px_rgba(30,41,59,0.18)]"
            : "mx-auto w-[min(1200px,calc(100%-2rem))] rounded-full px-6 py-3 bg-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <Link to={user ? "/setup" : "/"} className="flex items-center gap-2">
          <img src="/logo.png" alt="Skyward" className="h-7 w-7 object-contain" />
          <span className="font-semibold text-foreground -tracking-[0.02em]">Skyward</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex gap-2 items-center">
          {!user && (
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-4 text-sm font-medium hover:bg-transparent hover:text-primary"
            >
              <Link to="/pricing">Pricing</Link>
            </Button>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring border-2 border-primary/30 hover:border-primary/85 p-0.5 transition-colors duration-200"
                  aria-label="Account menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
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
                <DropdownMenuItem asChild>
                  <Link to="/setup">Setup guide</Link>
                </DropdownMenuItem>
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
          {!user && (
            <Button
              asChild
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-5 h-9 shadow-[0_8px_24px_-8px_rgba(125,167,217,0.6)]"
            >
              <Link to="/auth" search={{ mode: "register" }}>
                Get started
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile: logged-in user shows avatar, logged-out shows hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring border-2 border-primary/30 hover:border-primary/85 p-0.5 transition-colors duration-200"
                  aria-label="Account menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
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
                <DropdownMenuItem asChild>
                  <Link to="/setup">Setup guide</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleSignOut} className="text-destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="pointer-events-auto p-2 rounded-full text-foreground hover:text-primary transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile full-viewport overlay — logged-out only, sits behind the pill (z-10) */}
      {!user && mobileOpen && (
        <div className="pointer-events-auto sm:hidden fixed inset-0 bg-background/95 backdrop-blur-md flex flex-col pl-10 pr-6 pt-20 gap-1">
          <Link
            to="/pricing"
            onClick={closeMobile}
            className="py-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/auth"
            onClick={closeMobile}
            className="py-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
          >
            Login
          </Link>
          <div className="mt-4">
            <Link
              to="/auth"
              search={{ mode: "register" }}
              onClick={closeMobile}
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium px-6 py-2.5 shadow-[0_8px_24px_-8px_rgba(125,167,217,0.6)] hover:bg-primary/90 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
