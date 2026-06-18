import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { BlockedCategories } from "@/components/landing/BlockedCategories";
import { AllowedCategories } from "@/components/landing/AllowedCategories";
import { Pricing } from "@/components/landing/Pricing";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

const TITLE = "Skyward OS — A distraction-free smartphone";
const DESCRIPTION =
  "Skyward removes social media, games, dating apps, and porn from your phone so you can focus on what matters.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate({ to: "/setup" });
  }, [user, navigate]);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <BlockedCategories />
      <AllowedCategories />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
