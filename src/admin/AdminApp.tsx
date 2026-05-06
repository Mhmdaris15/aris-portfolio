import { Routes, Route } from "react-router-dom";
import AdminGate from "./AdminGate";
import AdminHome from "./AdminHome";
import BlogEditor from "./BlogEditor";
import "../styles/editorial.css";
import "./admin.css";

const AdminApp = () => (
  <AdminGate>
    <div className="admin-page">
      <div className="grain" />
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="new" element={<BlogEditor />} />
        <Route path="edit/:slug" element={<BlogEditor />} />
      </Routes>
    </div>
  </AdminGate>
);

export default AdminApp;
