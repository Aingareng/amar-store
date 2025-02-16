import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import Home from "../pages/dashboard/page";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
