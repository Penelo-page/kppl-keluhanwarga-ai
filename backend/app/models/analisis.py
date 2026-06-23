from sqlalchemy import Column, String, Float, ForeignKey
from app.database import Base

class AnalisisAI(Base):
    __tablename__ = "analisis_ai"

    idAnalisis = Column(String(20), primary_key=True)
    idKeluhan = Column(String(20), ForeignKey("keluhan.idKeluhan"))
    ringkasanTeks = Column(String(500))
    kategoriKlasifikasi = Column(String(100))
    confidenceScore = Column(Float)
    prioritasKeluhan = Column(String(20))
    alasanRekomendasi = Column(String(500))