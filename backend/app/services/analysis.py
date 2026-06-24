RULES = [
    ({"jalan", "berlubang", "rusak", "aspal"}, "Jalan Rusak", 0.92),
    ({"sampah", "bau", "tumpukan"}, "Tumpukan Sampah", 0.88),
    ({"fasilitas", "taman", "lampu", "bangku"}, "Fasilitas Rusak", 0.85),
    ({"bising", "berisik", "kebisingan", "suara"}, "Gangguan Kebisingan", 0.80),
]


def klasifikasi(teks: str):
    teks = teks.lower()
    for keywords, kategori, score in RULES:
        if any(keyword in teks for keyword in keywords):
            return kategori, score
    return "Lainnya", 0.60


def tentukan_prioritas(kategori: str, confidence: float):
    if kategori in {"Jalan Rusak", "Tumpukan Sampah"} and confidence >= 0.85:
        return "Tinggi", "Berpotensi membahayakan keselamatan warga"
    if kategori in {"Fasilitas Rusak", "Gangguan Kebisingan"}:
        return "Sedang", "Mengganggu kenyamanan warga"
    return "Rendah", "Perlu ditindaklanjuti namun tidak mendesak"
