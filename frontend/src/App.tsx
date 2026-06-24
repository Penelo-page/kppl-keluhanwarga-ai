import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import ClassificationResult from "./pages/ClassificationResult";
import Dashboard from "./pages/Dashboard";
import PriorityResult from "./pages/PriorityResult";
import SubmitComplaint from "./pages/SubmitComplaint";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout><SubmitComplaint /></UserLayout>} />
        <Route path="/result/:id" element={<UserLayout><ClassificationResult /></UserLayout>} />
        <Route path="/priority/:id" element={<UserLayout><PriorityResult /></UserLayout>} />
        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
