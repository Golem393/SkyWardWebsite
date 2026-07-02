import { supabase } from "@/lib/supabase";

// Base URL of the (separate) FastAPI backend that owns Stripe secret-key logic.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function authedPost<T>(path: string, body: unknown): Promise<T> {
  if (!BACKEND_URL) {
    throw new Error(
      "Missing VITE_BACKEND_URL. Point it at your backend, e.g. http://localhost:8787.",
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("You must be signed in.");
  }

  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(detail || `Backend request failed (${res.status}).`);
  }

  return res.json() as Promise<T>;
}

async function anonPost<T>(path: string, body: unknown): Promise<T> {
  if (!BACKEND_URL) {
    throw new Error(
      "Missing VITE_BACKEND_URL. Point it at your backend, e.g. http://localhost:8787.",
    );
  }

  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(detail || `Backend request failed (${res.status}).`);
  }

  return res.json() as Promise<T>;
}

/** Start a Stripe Checkout session for the given plan (no account required); returns the hosted URL. */
export function createCheckoutSessionAnon(plan: "monthly" | "yearly", seats: number = 1) {
  return anonPost<{ url: string }>("/api/stripe/checkout", { plan, seats });
}

/** Start a Stripe Checkout session for a logged-in user; returns the hosted URL. */
export function createCheckoutSession(plan: "monthly" | "yearly", seats: number = 1) {
  return authedPost<{ url: string }>("/api/stripe/checkout/authenticated", { plan, seats });
}

/** Open the Stripe billing portal (manage / cancel subscription); returns the hosted URL. */
export function createPortalSession() {
  return authedPost<{ url: string }>("/api/stripe/portal", {});
}
