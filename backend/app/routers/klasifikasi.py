from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.keluhan import Keluhan
from app.models.analisis import AnalisisAI
import uuid

router = APIRouter(prefix="/klasifikasi", tags=["Klasifikasi AI"])

# Fungsi sederhana klasifikasi berdasarkan keyword
def klasifikasi_sederhana(teks: str):
    teks = teks.lower()
    
    if any(kata in teks for kata in ["jalan", "berlubang", "rusak", "aspal"]):
        return "Jalan Rusak", 0.92
    elif any(kata in teks for kata in ["sampah", "bau", "tumpukan"]):
        return "Tumpukan Sampah", 0.88
    elif any(kata in teks for kata in ["fasilitas", "taman", "lampu", "bangku"]):
        return "Fasilitas Rusak", 0.85
    elif any(kata in teks for kata in ["bising", "berisik", "kebisingan", "suara"]):
        return "Gangguan Kebisingan", 0.80
    else:
        return "Lainnya", 0.60

@router.post("/{id_keluhan}")
def klasifikasi_keluhan(id_keluhan: str, db: Session = Depends(get_db)):
    # Cek keluhan ada atau tidak
    keluhan = db.query(Keluhan).filter(Keluhan.idKeluhan == id_keluhan).first()
    if not keluhan:
        raise HTTPException(status_code=404, detail="Keluhan tidak ditemukan")
    
    # Jalankan klasifikasi
    kategori, confidence = klasifikasi_sederhana(keluhan.deskripsi)
    
    # Simpan hasil analisis
    analisis = AnalisisAI(
        idAnalisis="ANL-" + str(uuid.uuid4())[:8].upper(),
        idKeluhan=id_keluhan,
        ringkasanTeks=keluhan.deskripsi[:200],
        kategoriKlasifikasi=kategori,
        confidenceScore=confidence,
    )
    
    db.add(analisis)
    db.commit()
    db.refresh(analisis)
    
    return {
        "message": "Klasifikasi selesai",
        "data": {
            "idKeluhan": id_keluhan,
            "kategori": kategori,
            "confidenceScore": f"{confidence * 100:.0f}%"
        }
    }