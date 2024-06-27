import { Routes, Route } from "react-router-dom";
import { Add as AddPatientPage } from "@/pages/Patient/Add";
import { Edit as EditPatientPage } from "@/pages/Patient/Edit";
import { Search as SearchPatientsPage } from "@/pages/Patient/Search";
import { Details as PatientDetailsPage } from "@/pages/Patient/Details";
import { Details as UkgDetailsPage } from "@/pages/Ukg/Details";
import { Add as AddUkgPage } from "@/pages/Ukg/Add";
import { Home as HomePage } from "@/pages/Home";
import { Settings as SettingsPage } from "@/pages/Settings";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/patient" element={<SearchPatientsPage />} />
      <Route path="/patient/add" element={<AddPatientPage />} />
      <Route path="/patient/:patientId/edit" element={<EditPatientPage />} />
      <Route path="/patient/:patientId" element={<PatientDetailsPage />} />
      <Route
        path="/patient/:patientId/ukg/:ukgId"
        element={<UkgDetailsPage />}
      />
      <Route path="/patient/:patientId/ukg/add" element={<AddUkgPage />} />
      <Route path="*" element={<div>No match</div>} />
    </Routes>
  );
};

export default Router;
