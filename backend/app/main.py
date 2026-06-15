"""Skyward backend — FastAPI app entrypoint.

Run locally:  uvicorn app.main:app --reload --port 8787

To merge into an existing FastAPI project, you mainly need stripe_routes.py:
    from app.stripe_routes import router as stripe_router
    app.include_router(stripe_router)
and the CORS + env setup below.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import config
from .stripe_routes import router as stripe_router

app = FastAPI(title="Skyward Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[config.FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stripe_router)


@app.get("/health")
def health():
    return {"ok": True}
