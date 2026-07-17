import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { usePostHog } from "@posthog/react";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle2, Mail, ArrowRight, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/success")({
  ssr: false,
  component: SuccessPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      auth: search.auth === "true" || search.auth === true,
    };
  },
});

interface RedditWindow extends Window {
  rdt?: (action: string, event: string) => void;
}

function SuccessPage() {
  const posthog = usePostHog();
  const { auth } = Route.useSearch();
  const { profile, refreshProfile } = useAuth();

  useEffect(() => {
    // Fire the Purchase event to the Reddit Pixel when the success page mounts
    if (typeof window !== "undefined") {
      const alreadyTracked = sessionStorage.getItem("reddit_pixel_purchase_tracked");

      if (!alreadyTracked) {
        const rdt = (window as unknown as RedditWindow).rdt;
        if (rdt) {
          rdt("track", "Purchase");
        }
        posthog.capture("subscription_purchased");
        sessionStorage.setItem("reddit_pixel_purchase_tracked", "true");
      }
    }
  }, [posthog]);

  // Poll for webhook completion if authenticated and still inactive
  useEffect(() => {
    if (!auth || !profile || profile.subscription_status !== "inactive") return;

    const intervalId = setInterval(() => {
      refreshProfile();
    }, 1500);

    // Stop polling after 15 seconds to avoid infinite loops
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 15000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [auth, profile?.subscription_status, refreshProfile]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-24 px-4 font-sans">
      <Navbar />

      <div className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-green-50 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm ring-1 ring-green-50">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">You're all set!</h1>
          <p className="text-slate-500 mb-8 max-w-[280px]">
            Your 30-day free trial is now active. Welcome to Skyward.
          </p>

          <div className="w-full border-t border-slate-100 mb-8" />

          {auth ? (
            <div className="w-full flex flex-col items-center gap-4">
              <Button
                asChild
                className="w-full h-12 rounded-xl text-base shadow-sm group transition-all"
                disabled={profile?.subscription_status === "inactive"}
              >
                <Link to="/dashboard" className="flex items-center justify-center w-full h-full">
                  {profile?.subscription_status === "inactive" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Setting up your account...
                    </>
                  ) : (
                    <>
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="w-full text-left">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Next step: Check your email</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We've sent you a magic link to securely sign in and set up your first device.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3 border border-slate-100">
                <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-500 leading-relaxed">
                  The email should arrive within a minute. Don't forget to check your spam folder!
                </p>
              </div>
            </div>
          )}

          <div className="w-full border-t border-slate-100 mt-8 mb-6" />

          <p className="text-sm text-slate-500 flex items-center justify-center gap-1.5">
            Need help? Reach us at{" "}
            <a
              href="mailto:hello@skywardos.com"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              hello@skywardos.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
