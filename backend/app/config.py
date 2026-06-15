"""Environment configuration for the Skyward backend.

All secrets live here (never in the frontend repo). Copy .env.example to .env
and fill in real values, or set these in your deployment environment.
"""

import os

from dotenv import load_dotenv

load_dotenv()


def _require(name: str) -> str:
    value = os.environ.get(name, "")
    if not value:
        # Fail loud at startup rather than at request time.
        raise RuntimeError(f"Missing required env var: {name}")
    return value


# Stripe
STRIPE_SECRET_KEY = _require("STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET = _require("STRIPE_WEBHOOK_SECRET")
STRIPE_PRICE_MONTHLY = _require("STRIPE_PRICE_MONTHLY")
STRIPE_PRICE_YEARLY = _require("STRIPE_PRICE_YEARLY")

# Supabase (service-role key — bypasses RLS; backend only)
SUPABASE_URL = _require("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = _require("SUPABASE_SERVICE_ROLE_KEY")

# Frontend origin (used for CORS + Stripe redirect URLs)
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000").rstrip("/")

# price id -> plan name, for writing `plan` onto the profile row
PRICE_TO_PLAN = {
    STRIPE_PRICE_MONTHLY: "monthly",
    STRIPE_PRICE_YEARLY: "yearly",
}

PLAN_TO_PRICE = {
    "monthly": STRIPE_PRICE_MONTHLY,
    "yearly": STRIPE_PRICE_YEARLY,
}
