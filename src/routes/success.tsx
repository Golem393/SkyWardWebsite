import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/success")({
  ssr: false,
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <CardTitle className="mt-2 text-2xl">Thank you for your purchase.</CardTitle>
          <CardDescription>Your account is active.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground">Next step: Prepare your phone for Skyward.</p>
          <Button asChild className="rounded-full">
            <Link to="/dashboard">Start setup</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
