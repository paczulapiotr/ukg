import { Routes, Route } from "react-router-dom";
import { New } from "@/pages/Exams/New";
import { Search } from "@/pages/Exams/Search";
import { Upsert } from "@/pages/Patient/Upsert";

const Router = () => {
  return (
    <Routes>
      <Route path="/ukg" element={<Search />} />
      <Route path="/ukg/add" element={<New />} />
      <Route path="/patient/upsert" element={<Upsert />} />
      <Route path="*" element={<div>No match</div>} />
    </Routes>
  );
};

export default Router;
