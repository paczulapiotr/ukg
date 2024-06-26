import { Routes, Route } from "react-router-dom";
import { Upsert as UpsertPatientPage } from "@/pages/Patient/Upsert";
import { Search as SearchPatientsPage } from "@/pages/Patient/Search";
import { Details as PatientDetailsPage } from "@/pages/Patient/Details";

const Router = () => {
  return (
    <Routes>
      <Route path="/patient" element={<SearchPatientsPage />} />
      <Route path="/patient/add" element={<UpsertPatientPage />} />
      <Route path="/patient/edit/:id" element={<UpsertPatientPage />} />
      <Route path="/patient/details/:id" element={<PatientDetailsPage />} />
      <Route path="*" element={<div>No match</div>} />
    </Routes>
  );
};

export default Router;
