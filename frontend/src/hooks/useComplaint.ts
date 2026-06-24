import { useState, useEffect } from "react";
import { getComplaintById } from "../api";
import type { Complaint } from "../types";

export function useComplaint(id: string | undefined, initialComplaint: Complaint | null) {
  const [complaint, setComplaint] = useState<Complaint | null>(initialComplaint);
  const [loading, setLoading] = useState<boolean>(!initialComplaint && !!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we already have the complaint in state, don't fetch it again
    if (complaint) return;

    if (!id) {
      setError("Laporan tidak valid.");
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    getComplaintById(id)
      .then((data) => {
        if (isMounted) {
          setComplaint(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Gagal mengambil data laporan.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, complaint]);

  return { complaint, loading, error };
}
