# Keluhan Warga AI

Sistem pengaduan keluhan warga berbasis AI untuk mengklasifikasikan kategori keluhan secara otomatis serta menentukan prioritas penanganan secara real-time.

Aplikasi ini menggunakan FastAPI untuk backend, React (Vite + TypeScript) untuk frontend, dan Supabase untuk database.

## Fitur Utama

1. **Klasifikasi AI**: Mengelompokkan laporan secara otomatis ke kategori tertentu (Jalan Rusak, Tumpukan Sampah, dsb) beserta confidence score.
2. **Prioritas Urgensi**: Menentukan urgensi penanganan (Tinggi, Sedang, Rendah) beserta alasan pendukung.
3. **Dashboard Real-time**: Visualisasi statistik laporan dalam bentuk chart (diagram batang & lingkaran) dan tabel laporan terbaru untuk admin/petugas.

## Struktur Proyek

```text
kppl-keluhanwarga-ai/
├── backend/                  # REST API FastAPI
│   └── app/
│       ├── core/            # Database (Supabase Client)
│       ├── routers/         # Endpoint API
│       ├── schemas/         # Validasi Request
│       ├── services/        # Logika klasifikasi AI
│       └── main.py          # Konfigurasi aplikasi backend
├── frontend/                 # Web Application React + Vite
│   └── src/
│       ├── api/             # Integrasi API backend
│       ├── components/      # UI Components modular
│       ├── hooks/           # Custom React hooks
│       ├── pages/           # Halaman utama aplikasi
│       └── App.tsx          # Konfigurasi routing
├── supabase/                 # Migrasi database Supabase
├── .env.example              # Template variabel lingkungan gabungan (Root)
└── README.md                 # Dokumentasi proyek
```

## Panduan Instalasi & Menjalankan Proyek

### 1. Konfigurasi Environment
Salin berkas `.env.example` di root folder menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan nilai `SUPABASE_URL` dan `SUPABASE_SECRET_KEY` dengan proyek Supabase Anda.

### 2. Menjalankan Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Untuk Windows gunakan: .venv\Scripts\activate
pip install -r requirements.txt
fastapi dev app/main.py
```
Backend akan berjalan di `http://localhost:8000`. Dokumentasi Swagger API tersedia di `http://localhost:8000/docs`.

### 3. Menjalankan Frontend (Vite)
```bash
cd frontend
pnpm install
pnpm dev
```
Frontend akan berjalan di `http://localhost:3000`.

## Endpoint REST API

Semua respons API dikembalikan dalam format standard JSON:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Pesan status",
  "data": { ... }
}
```

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `POST` | `/keluhan/` | Mengirim aduan baru, menganalisis kategori & prioritas, lalu menyimpannya ke database. |
| `GET` | `/keluhan/{id_keluhan}` | Mengambil data detail keluhan berdasarkan ID laporan. |
| GET | /dashboard/ | Mengambil data metrik statistik dashboard petugas. |

## Panduan Deployment

### 1. Backend (Hugging Face Spaces)
Backend dideploy menggunakan Docker Space di Hugging Face.
1. Buat Space baru di Hugging Face, pilih SDK **Docker** (gunakan template Blank).
2. Unggah isi folder `backend/` ke root repository Space Anda.
3. Buka tab **Settings** di Space Hugging Face Anda, tambahkan variabel/secrets berikut:
   * `SUPABASE_URL`: URL API Supabase Anda.
   * `SUPABASE_SECRET_KEY`: Service/Secret Key Supabase Anda.
4. Hugging Face akan membangun container menggunakan `Dockerfile` yang telah disediakan dan menjalankannya pada port default `7860`. URL API backend Anda akan berformat: `https://<username>-<space-name>.hf.space`.

### 2. Frontend (Netlify)
Frontend dideploy langsung ke Netlify.
1. Hubungkan repository GitHub Anda ke Netlify.
2. Netlify akan mendeteksi file `netlify.toml` secara otomatis untuk mengatur build directory (`frontend/dist`) dan command build (`pnpm build`).
3. Pada dashboard Netlify, masuk ke **Site configuration** -> **Environment variables**, tambahkan variabel:
   * `VITE_API_URL`: Isi dengan URL backend Hugging Face Spaces Anda (contoh: `https://username-space-name.hf.space`).
4. Jalankan deploy, dan web React SPA Anda siap diakses.

