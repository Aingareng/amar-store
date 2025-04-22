import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login/LoginPage";
import Home from "../pages/dashboard/page";
import EmployeeDetails from "../pages/dashboard/employee-details/EmployeeDetailsPage";
import DashboardLayout from "../pages/dashboard/layout";
import CriteriaPage from "../pages/dashboard/settings/criteria/CriteriaPage";
import SkillPage from "../pages/dashboard/settings/skill/SkillPage";
import LeadershipPage from "../pages/dashboard/settings/leadership/LeaderhipPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/employee-details/:slug" element={<EmployeeDetails />} />
          <Route path="/setting/criteria" element={<CriteriaPage />} />
          <Route path="/setting/skills" element={<SkillPage />} />
          <Route path="/setting/leadership" element={<LeadershipPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
