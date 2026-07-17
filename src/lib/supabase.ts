import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Shape of a row in the `profiles` table.
export interface Profile {
  id: string;
  email: string | null;
  imei: string | null;
  terms_accepted_at: string | null;
  terms_version: string | null;
  created_at: string;
  plan: "monthly" | "yearly" | null;
  subscription_status: "inactive" | "active" | "canceled" | "past_due" | "trialing" | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean | null;
  new_existing_device: "new" | "existing" | null;
}
