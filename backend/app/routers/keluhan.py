from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.keluhan import Keluhan, StatusKeluhan
from app.models.analisis import AnalisisAI
from app.schemas.keluhan import KeluhanCreate
from datetime import datetime
import uuid

router = APIRouter(prefix="/keluhan", tags=["Keluhan"])

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

def tentukan_prioritas(kategori: str, confidence: float):
    if kategori in ["Jalan Rusak", "Tumpukan Sampah"] and confidence >= 0.85:
        return "Tinggi", "Berpotensi membahayakan keselamatan warga"
    elif kategori in ["Fasilitas Rusak", "Gangguan Kebisingan"]:
        return "Sedang", "Mengganggu kenyamanan warga"
    else:
        return "Rendah", "Perlu ditindaklanjuti namun tidak mendesak"

@router.post("/")
def buat_keluhan(data: KeluhanCreate, db: Session = Depends(get_db)):
    # Simpan keluhan
    id_baru = "LAP-" + str(uuid.uuid4())[:8].upper()
    keluhan_baru = Keluhan(
        idKeluhan=id_baru,
        judul=data.judul,
        deskripsi=data.teks_keluhan,
        tanggalKirim=datetime.now(),
        statusSaatIni=StatusKeluhan.DIKIRIM
    )
    db.add(keluhan_baru)
    db.commit()

    # Langsung klasifikasi & prioritas
    kategori, confidence = klasifikasi_sederhana(data.teks_keluhan)
    prioritas, alasan = tentukan_prioritas(kategori, confidence)

    # Simpan hasil analisis
    analisis = AnalisisAI(
        idAnalisis="ANL-" + str(uuid.uuid4())[:8].upper(),
        idKeluhan=id_baru,
        ringkasanTeks=data.teks_keluhan[:200],
        kategoriKlasifikasi=kategori,
        confidenceScore=confidence,
        prioritasKeluhan=prioritas,
        alasanRekomendasi=alasan
    )
    db.add(analisis)
    db.commit()

    # Return langsung kategori & prioritas ke frontend
    return {
        "kategori": kategori,
        "prioritas": prioritas,
        "alasan": alasan,
        "idKeluhan": id_baru
    }

@router.get("/")
def lihat_semua_keluhan(db: Session = Depends(get_db)):
    semua = db.query(Keluhan).all()
    return {"data": semua}

@router.get("/{id_keluhan}")
def lihat_detail_keluhan(id_keluhan: str, db: Session = Depends(get_db)):
    keluhan = db.query(Keluhan).filter(Keluhan.idKeluhan == id_keluhan).first()
    if not keluhan:
        raise HTTPException(status_code=404, detail="Keluhan tidak ditemukan")
    return {"data": keluhan}