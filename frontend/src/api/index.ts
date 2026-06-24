import type { Complaint, DashboardData } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function submitComplaint(title: string, description: string): Promise<Complaint> {
  const response = await fetch(`${API_BASE_URL}/keluhan/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ judul: title, teks_keluhan: description }),
  });

  if (!response.ok) {
    throw new Error("Laporan gagal dikirim.");
  }

  const { data } = await response.json();
  return {
    id: data.idKeluhan,
    title: data.judul,
    description: data.deskripsi,
    category: data.kategori,
    confidenceScore: data.confidenceScore,
    priority: data.prioritas,
    priorityReason: data.alasan,
    date: data.tanggalKirim.slice(0, 10),
  };
}

export async function getComplaintById(id: string): Promise<Complaint> {
  const response = await fetch(`${API_BASE_URL}/keluhan/${id}`);
  if (!response.ok) {
    throw new Error("Laporan tidak ditemukan.");
  }
  const { data } = await response.json();
  return {
    id: data.idKeluhan,
    title: data.judul,
    description: data.deskripsi,
    category: data.kategori,
    confidenceScore: data.confidenceScore,
    priority: data.prioritas,
    priorityReason: data.alasan,
    date: data.tanggalKirim.slice(0, 10),
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch(`${API_BASE_URL}/dashboard/`);
  if (!response.ok) {
    throw new Error("Data dashboard gagal dimuat.");
  }
  const result = await response.json();
  return result.data;
}
