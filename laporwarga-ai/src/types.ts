export type Priority = "Tinggi" | "Sedang" | "Rendah";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  date: string;
  confidenceScore?: number;
  priorityReason?: string;
}

export interface ComplaintLocationState {
  complaint: Complaint;
}
