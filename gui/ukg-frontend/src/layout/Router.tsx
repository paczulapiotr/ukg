import { Routes, Route } from "react-router-dom";
import { New } from "../pages/Exams/New";
import { Search } from "../pages/Exams/Search";
import { Button } from "antd";

const body = {
  userName: "wczapla",
  password: "haslo123",
  rememberMe: true,
};
const apiUrl = "https://localhost:7164";

const login = () =>
  fetch(`${apiUrl}/api/account/login`, {
    body: JSON.stringify(body),
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

const logout = () =>
  fetch(`${apiUrl}/api/account/logout`, {
    method: "POST",
    credentials: "include",
  });

const info = () =>
  fetch(`${apiUrl}/api/account`, {
    method: "GET",
    credentials: "include",
  });

const testAuth = () =>
  fetch(`${apiUrl}//api/ukg/pdf/asd`, {
    credentials: "include",
  });

const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <div>
            <h1>Hello world!</h1>
            <Button onClick={login}>Login</Button>
            <Button onClick={logout}>Logout</Button>
            <Button onClick={info}>Info</Button>
            <Button onClick={testAuth}>Test auth</Button>
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
