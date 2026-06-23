from sqlalchemy import Column, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from app.database import Base
import enum

class StatusKeluhan(str, enum.Enum):
    DIKIRIM = "DIKIRIM"
    MENUNGGU_VERIFIKASI = "MENUNGGU_VERIFIKASI"
    DIVERIFIKASI = "DIVERIFIKASI"
    DALAM_PENANGANAN = "DALAM_PENANGANAN"
    SELESAI = "SELESAI"
    DITUNDA = "DITUNDA"

class Keluhan(Base):
    __tablename__ = "keluhan"

    idKeluhan = Column(String(20), primary_key=True)
    judul = Column(String(255), nullable=False)
    deskripsi = Column(Text, nullable=False)
    tanggalKirim = Column(DateTime, default=func.now())
    statusSaatIni = Column(
        Enum(StatusKeluhan),
        default=StatusKeluhan.DIKIRIM
    )