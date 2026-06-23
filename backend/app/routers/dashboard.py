from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.keluhan import Keluhan
from app.models.analisis import AnalisisAI

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def lihat_dashboard(db: Session = Depends(get_db)):
    total = db.query(Keluhan).count()
    
    semua_analisis = db.query(AnalisisAI).all()
    
    # Hitung distribusi prioritas
    prioritas_count = {"TINGGI": 0, "SEDANG": 0, "RENDAH": 0}
    kategori_count = {}
    
    for a in semua_analisis:
        if a.prioritasKeluhan in prioritas_count:
            prioritas_count[a.prioritasKeluhan] += 1
        
        if a.kategoriKlasifikasi:
            kategori_count[a.kategoriKlasifikasi] = \
                kategori_count.get(a.kategoriKlasifikasi, 0) + 1
    
    return {
        "data": {
            "totalLaporan": total,
            "distribusiPrioritas": prioritas_count,
            "laporanPerKategori": kategori_count
        }
    }