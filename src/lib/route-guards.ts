import { redirect } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

/**
 * Route `beforeLoad` guard: require an authenticated session.
 *
 * Unauthenticated visitors are sent to `/auth`, preserving where they were
 * headed (`redirect`) so they land back there after logging in. Any extra
 * search params (e.g. the chosen `plan`) are carried through untouched.
 */
export async function requireAuth(opts: { href: string; search?: Record<string, unknown> }) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw redirect({
      to: "/auth",
      search: { redirect: opts.href, ...opts.search },
    });
  }

  return { session };
}

/**
 * Redirect already authenticated users away from the auth page.
 */
export async function redirectIfAuth(opts: { search?: Record<string, unknown> }) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // We could read `opts.search.redirect` here if we want to honor it,
    // but defaulting to `/dashboard` is usually fine for a logged-in user hitting `/auth`.
    const searchObj = opts.search as { redirect?: string };
    throw redirect({
      to: searchObj?.redirect ?? "/dashboard",
    });
  }
}
