from fastapi import APIRouter, Depends, status
from supabase import Client

from app.core.database import get_db

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/")
def lihat_dashboard(db: Client = Depends(get_db)):
    rows = (
        db.table("keluhan")
        .select("id_keluhan,judul,tanggal_kirim,kategori,prioritas")
        .order("tanggal_kirim", desc=True)
        .execute()
        .data
    )
    prioritas = {"Tinggi": 0, "Sedang": 0, "Rendah": 0}
    kategori = {}

    for row in rows:
        if row["prioritas"]:
            prioritas[row["prioritas"]] += 1
        if row["kategori"]:
            kategori[row["kategori"]] = kategori.get(row["kategori"], 0) + 1

    return {
        "success": True,
        "statusCode": status.HTTP_200_OK,
        "message": "Data dashboard berhasil diambil.",
        "data": {
            "totalLaporan": len(rows),
            "distribusiPrioritas": prioritas,
            "laporanPerKategori": kategori,
            "laporanTerbaru": [
                {
                    "idKeluhan": row["id_keluhan"],
                    "judul": row["judul"],
                    "kategori": row["kategori"],
                    "prioritas": row["prioritas"],
                    "tanggalKirim": row["tanggal_kirim"],
                }
                for row in rows[:10]
            ],
        }
    }
