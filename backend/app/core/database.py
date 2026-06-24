import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv(Path(__file__).resolve().parents[3] / ".env")


@lru_cache
def get_db() -> Client:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SECRET_KEY")

    if not url or not key:
        raise RuntimeError("SUPABASE_URL dan SUPABASE_SECRET_KEY wajib diisi")

    return create_client(url, key)
