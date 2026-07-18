import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import { requireAuth } from "@/lib/route-guards";
import { Home, User, Settings, ShieldCheck, Database, Menu, X, LogOut, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardPricing } from "@/components/dashboard/DashboardPricing";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ location }) => requireAuth({ href: location.pathname }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, profile, isLoading, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Account", href: "/dashboard/account", icon: User },
    { name: "Contact Support", href: "/dashboard/contact", icon: Mail },
  ];

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    window.location.href = "/";
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Skyward" className="h-8 w-8 object-contain" />
          <span className="font-semibold text-lg text-foreground tracking-tight">Skyward</span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col px-4 pt-4">
        <ul className="flex flex-1 flex-col gap-y-2">
          {navigation.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(item.href);
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center gap-x-3 rounded-lg p-2.5 text-sm font-medium leading-6 transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li className="mt-auto pb-4">
            <button
              onClick={handleSignOut}
              className="group flex items-center w-full gap-x-3 rounded-lg p-2.5 text-sm font-medium leading-6 text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-destructive" />
              Sign out
            </button>
          </li>
        </ul>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile navigation bar */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background/80 backdrop-blur-md px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-foreground">Dashboard</div>
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative mr-16 flex w-full max-w-xs flex-1 flex-col bg-card border-r shadow-xl">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-card">
        <SidebarContent />
      </div>

      {/* Main content area */}
      <main className="lg:pl-64">
        <div className="min-h-screen relative aurora">
          {isLoading || isSigningOut ? null : (!profile?.subscription_status ||
            profile.subscription_status === "canceled" ||
            profile.subscription_status === "inactive") && 
            location.pathname !== "/dashboard/contact" &&
            location.pathname !== "/dashboard/account" ? (
            <DashboardPricing />
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
}
