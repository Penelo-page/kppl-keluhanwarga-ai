import type { Complaint } from "./types";

const rows = [
  ["001", "Jalan Berlubang di Depan Sekolah", "Terdapat jalan berlubang cukup besar yang membahayakan pengendara.", "Jalan Rusak", "Tinggi", "2023-10-25"],
  ["002", "Tumpukan Sampah Bau Menengat", "Sampah tidak diangkut selama seminggu di TPS.", "Tumpukan Sampah", "Tinggi", "2023-10-26"],
  ["003", "Lampu Taman Mati", "Lampu di taman kota bagian utara mati semua.", "Fasilitas Rusak", "Sedang", "2023-10-26"],
  ["004", "Sistem Drainase Mampet", "Selokan mampet menyebabkan genangan air.", "Fasilitas Rusak", "Tinggi", "2023-10-27"],
  ["005", "Pabrik Berisik Malam Hari", "Suara mesin mengganggu waktu istirahat warga.", "Gangguan Kebisingan", "Sedang", "2023-10-28"],
  ["006", "Trotoar Rusak Parah", "Paving block banyak yang lepas.", "Jalan Rusak", "Rendah", "2023-10-28"],
  ["007", "Sampah Berserakan di Pasar", "Sisa sayuran dan plastik berserakan.", "Tumpukan Sampah", "Sedang", "2023-10-29"],
  ["008", "Bangku Halte Patah", "Tidak bisa digunakan untuk duduk menunggu bus.", "Fasilitas Rusak", "Rendah", "2023-10-29"],
  ["009", "Konvoi Motor Bising", "Sering terjadi di akhir pekan.", "Gangguan Kebisingan", "Sedang", "2023-10-30"],
  ["010", "Aspal Ambles di Persimpangan", "Sagat berbahaya bagi pengguna jalan raya.", "Jalan Rusak", "Tinggi", "2023-10-30"],
] as const;

export const mockDashboardData: Complaint[] = rows.map(
  ([id, title, description, category, priority, date]) => ({
    id: `LAP-${id}`, title, description, category, priority, date,
  })
);
