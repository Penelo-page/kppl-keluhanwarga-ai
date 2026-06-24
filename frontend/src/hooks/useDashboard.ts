import { useState, useEffect } from "react";
import { getDashboardData } from "../api";
import type { DashboardData } from "../types";

const emptyDashboard: DashboardData = {
  totalLaporan: 0,
  distribusiPrioritas: { Tinggi: 0, Sedang: 0, Rendah: 0 },
  laporanPerKategori: {},
  laporanTerbaru: [],
};

export function useDashboard() {
  const [data, setData] = useState<DashboardData>(emptyDashboard);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : "Data dashboard gagal dimuat."));
  }, []);

  return { data, error };
}
