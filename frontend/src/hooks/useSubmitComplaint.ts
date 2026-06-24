import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { submitComplaint } from "../api";

export function useSubmitComplaint() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.title.trim().length < 3 || form.description.trim().length < 10) {
      setError("Judul minimal 3 karakter dan deskripsi minimal 10 karakter.");
      return;
    }
    setError("");
    setStatus("loading");

    try {
      const newComplaint = await submitComplaint(form.title, form.description);
      setStatus("success");

      setTimeout(() => {
        navigate(`/result/${newComplaint.id}`, { state: { complaint: newComplaint } });
      }, 700);
    } catch (error) {
      setStatus("idle");
      setError(error instanceof Error ? error.message : "Laporan gagal dikirim.");
    }
  };

  return {
    form,
    setForm,
    error,
    status,
    disabled: status !== "idle",
    handleSubmit,
  };
}
