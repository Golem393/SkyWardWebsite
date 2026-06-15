# Skyward Backend (FastAPI)

Owns the Stripe secret-key logic: Checkout, billing portal, and the webhook that
syncs subscription state into Supabase. Designed to be lifted into your existing
Python repo — copy the `app/` package and `include_router(stripe_router)`.

## Endpoints

| Method | Path        | Auth                  | Purpose                                            |
| ------ | ----------- | --------------------- | -------------------------------------------------- |
| POST   | `/checkout` | Bearer (Supabase JWT) | Create a Stripe Checkout session → `{ url }`       |
| POST   | `/portal`   | Bearer (Supabase JWT) | Open the Stripe billing portal → `{ url }`         |
| POST   | `/webhook`  | Stripe signature      | Sync subscription status → Supabase `profiles`     |
| GET    | `/health`   | —                     | Liveness check                                     |

## Run locally

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in real values
uvicorn app.main:app --reload --port 8787
```

Point the frontend at it with `VITE_BACKEND_URL=http://localhost:8787`.

## Test the webhook with the Stripe CLI

```bash
stripe login
stripe listen --forward-to localhost:8787/webhook
# copy the printed whsec_... into STRIPE_WEBHOOK_SECRET, then in another shell:
stripe trigger checkout.session.completed
```

Run a real test payment from the frontend (Stripe test card `4242 4242 4242 4242`)
and confirm `profiles.subscription_status` flips to `active`.

## Merging into an existing FastAPI repo

```python
from app.stripe_routes import router as stripe_router
app.include_router(stripe_router)
```

Make sure the env vars from `.env.example` and the CORS origin (`FRONTEND_URL`)
are configured in that app too. The webhook reads the **raw** request body, so
don't put body-parsing middleware in front of `/webhook`.
