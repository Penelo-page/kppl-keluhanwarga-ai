from pydantic import BaseModel

class KeluhanCreate(BaseModel):
    judul: str
    teks_keluhan: str