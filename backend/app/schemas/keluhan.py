from pydantic import BaseModel, Field


class KeluhanCreate(BaseModel):
    judul: str = Field(min_length=3, max_length=255)
    teks_keluhan: str = Field(min_length=10, max_length=5000)
