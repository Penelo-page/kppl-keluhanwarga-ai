import uuid

from fastapi import APIRouter, Depends, status, HTTPException
from supabase import Client

from app.core.database import get_db
from app.schemas.keluhan import KeluhanCreate
from app.services.analysis import klasifikasi, tentukan_prioritas

router = APIRouter(prefix="/keluhan", tags=["Keluhan"])


def format_keluhan(row: dict):
    return {
        "idKeluhan": row["id_keluhan"],
        "judul": row["judul"],
        "deskripsi": row["deskripsi"],
        "tanggalKirim": row["tanggal_kirim"],
        "statusSaatIni": row["status"],
        "kategori": row["kategori"],
        "confidenceScore": round(float(row["confidence_score"]) * 100),
        "prioritas": row["prioritas"],
        "alasan": row["alasan"],
    }


@router.post("/", status_code=status.HTTP_201_CREATED)
def buat_keluhan(data: KeluhanCreate, db: Client = Depends(get_db)):
    kategori, confidence = klasifikasi(data.teks_keluhan)
    prioritas, alasan = tentukan_prioritas(kategori, confidence)
    id_keluhan = f"LAP-{uuid.uuid4().hex[:8].upper()}"

    result = db.table("keluhan").insert({
        "id_keluhan": id_keluhan,
        "judul": data.judul,
        "deskripsi": data.teks_keluhan,
        "ringkasan": data.teks_keluhan[:200],
        "kategori": kategori,
        "confidence_score": confidence,
        "prioritas": prioritas,
        "alasan": alasan,
    }).execute()

    return {
        "success": True,
        "statusCode": status.HTTP_201_CREATED,
        "message": "Keluhan berhasil dikirim.",
        "data": format_keluhan(result.data[0]),
    }


@router.get("/{id_keluhan}")
def ambil_keluhan(id_keluhan: str, db: Client = Depends(get_db)):
    result = db.table("keluhan").select("*").eq("id_keluhan", id_keluhan).execute()
    if not result.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Keluhan tidak ditemukan."
        )
    return {
        "success": True,
        "statusCode": status.HTTP_200_OK,
        "data": format_keluhan(result.data[0]),
    }
