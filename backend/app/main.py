from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.exceptions import register_exception_handlers
from app.routers import dashboard, keluhan

app = FastAPI(title="API Pengaduan Warga", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(keluhan.router)
app.include_router(dashboard.router)
register_exception_handlers(app)
