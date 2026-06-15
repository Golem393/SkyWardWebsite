"""Supabase helpers for the backend.

`service` is a service-role client (bypasses RLS) used by the webhook to write
subscription state. `get_user_from_token` verifies the Supabase access token
sent by the frontend so we know which user a checkout/portal request is for.
"""

from functools import lru_cache
from typing import Optional

from supabase import Client, create_client

from . import config


@lru_cache(maxsize=1)
def service() -> Client:
    return create_client(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY)


def get_user_from_token(access_token: str):
    """Return the authenticated user for a Supabase access token, or None."""
    try:
        res = service().auth.get_user(access_token)
    except Exception:
        return None
    return res.user if res else None


def get_profile(user_id: str) -> Optional[dict]:
    res = service().table("profiles").select("*").eq("id", user_id).maybe_single().execute()
    return res.data if res else None


def update_profile(user_id: str, values: dict) -> None:
    res = service().table("profiles").update(values).eq("id", user_id).execute()
    if not res.data:
        print(f"WARNING: Failed to update profile for user {user_id}. RLS might be blocking it (check SUPABASE_SERVICE_ROLE_KEY) or user doesn't exist.")

def update_profile_by_customer(customer_id: str, values: dict) -> None:
    res = service().table("profiles").update(values).eq("stripe_customer_id", customer_id).execute()
    if not res.data:
        print(f"WARNING: Failed to update profile for customer {customer_id}. RLS might be blocking it (check SUPABASE_SERVICE_ROLE_KEY) or customer doesn't exist.")
