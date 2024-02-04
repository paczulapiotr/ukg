import { Routes, Route } from "react-router-dom";
import { New } from "../pages/Exams/New";
import { Search } from "../pages/Exams/Search";
import { Button } from "antd";
import instance from "../services/api";
import { useAuth } from "../auth/AuthProvider/useAuth";

const info = () => instance.get(`auth/info`);

const Router = () => {
  const { login, logout, refreshToken } = useAuth();
  return (
    <Routes>
      <Route
        index
        element={
          <div>
            <h1>Hello world!</h1>
            <Button onClick={() => login("admin", "admin123")}>Login</Button>
            <Button onClick={refreshToken}>Refresh token</Button>
            <Button onClick={logout}>Logout</Button>
            <Button onClick={info}>Info</Button>
          </div>
        }
      />
      <Route path="/ukg" element={<Search />} />
      <Route path="/ukg/new" element={<New />} />
      <Route path="*" element={<div>No match</div>} />
    </Routes>
  );
};

export default Router;
