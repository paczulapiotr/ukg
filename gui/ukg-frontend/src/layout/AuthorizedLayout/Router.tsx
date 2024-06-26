import { Routes, Route } from "react-router-dom";
import { New } from "@/pages/Exams/New";
import { Search } from "@/pages/Exams/Search";
import { Upsert as AddPatientPage } from "@/pages/Patient/Upsert";
import { Search as SearchPatientsPage } from "@/pages/Patient/Search";

const Router = () => {
  return (
    <Routes>
      <Route path="/ukg" element={<Search />} />
      <Route path="/ukg/add" element={<New />} />
      <Route path="/patient/upsert" element={<AddPatientPage />} />
      <Route path="/patient" element={<SearchPatientsPage />} />
      <Route path="*" element={<div>No match</div>} />
    </Routes>
  );
};

export default Router;
