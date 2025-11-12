# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_auth import router as auth_router

app = FastAPI()

# CORS (so HTML frontend can talk to backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend URL in prod
    allow_methods=["*"],
    allow_headers=["*"],
)

# include auth routes
app.include_router(auth_router)