from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import keluhan, klasifikasi, prioritas, dashboard

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Pengaduan Warga",
    description="Sistem AI Analisis dan Prioritas Keluhan Warga",
    version="1.0.0"
)

# Izinkan frontend akses backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(keluhan.router)
app.include_router(klasifikasi.router)
app.include_router(prioritas.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {"message": "API Pengaduan Warga berjalan!"}