from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.analisis import AnalisisAI

router = APIRouter(prefix="/prioritas", tags=["Prioritas"])

def tentukan_prioritas(kategori: str, confidence: float):
    if kategori in ["Jalan Rusak", "Tumpukan Sampah"] and confidence >= 0.85:
        return "TINGGI", "Berpotensi membahayakan keselamatan warga"
    elif kategori in ["Fasilitas Rusak", "Gangguan Kebisingan"]:
        return "SEDANG", "Mengganggu kenyamanan warga"
    else:
        return "RENDAH", "Perlu ditindaklanjuti namun tidak mendesak"

@router.get("/{id_keluhan}")
def lihat_prioritas(id_keluhan: str, db: Session = Depends(get_db)):
    analisis = db.query(AnalisisAI).filter(
        AnalisisAI.idKeluhan == id_keluhan
    ).first()
    
    if not analisis:
        raise HTTPException(
            status_code=404, 
            detail="Analisis belum tersedia, jalankan klasifikasi dulu"
        )
    
    prioritas, alasan = tentukan_prioritas(
        analisis.kategoriKlasifikasi,
        analisis.confidenceScore
    )
    
    # Update ke database
    analisis.prioritasKeluhan = prioritas
    analisis.alasanRekomendasi = alasan
    db.commit()
    
    return {
        "data": {
            "idKeluhan": id_keluhan,
            "kategori": analisis.kategoriKlasifikasi,
            "prioritas": prioritas,
            "alasan": alasan
        }
    }