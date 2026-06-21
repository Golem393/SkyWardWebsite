import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePostHog } from "@posthog/react";

export const Route = createFileRoute("/success")({
  ssr: false,
  component: SuccessPage,
});

interface RedditWindow extends Window {
  rdt?: (action: string, event: string) => void;
}

function SuccessPage() {
  const posthog = usePostHog();

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <Navbar />
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <CardTitle className="mt-2 text-2xl">Thank you for your purchase.</CardTitle>
          <CardDescription>Your account is active.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground">Next step: Prepare your phone for Skyward.</p>
          <Button asChild className="rounded-full">
            <Link to="/setup">Start setup</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
