import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import Home from "../pages/dashboard/page";
import EmployeeDetails from "../pages/dashboard/employee-details/EmployeeDetailsPage";
import CriteriaPage from "../pages/dashboard/settings/criteria/CriteriaPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employee-details/:slug" element={<EmployeeDetails />} />
        <Route path="/setting/criteria" element={<CriteriaPage />} />
      </Routes>
    </BrowserRouter>
  );
}
