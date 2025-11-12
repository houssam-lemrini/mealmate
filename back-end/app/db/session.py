# app/db/session.py
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()  # load from .env

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Supabase URL or KEY not set in .env")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)