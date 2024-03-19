import { Routes, Route } from "react-router-dom";
import { New } from "../../pages/Exams/New";
import { Search } from "../../pages/Exams/Search";

const Router = () => {
  return (
    <Routes>
      <Route path="/ukg" element={<Search />} />
      <Route path="/ukg/new" element={<New />} />
      <Route path="*" element={<div>No match</div>} />
    </Routes>
  );
};

export default Router;
