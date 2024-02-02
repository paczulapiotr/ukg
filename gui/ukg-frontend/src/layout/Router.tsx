import { Routes, Route } from "react-router-dom";
import { New } from "../pages/Exams/New";
import { Search } from "../pages/Exams/Search";
import { Button } from "antd";
let accessToken = "";
let refreshToken = "";
const body = {
  username: "admin",
  password: "admin123",
};
const apiUrl = "https://localhost:7164";

const login = () =>
  fetch(`${apiUrl}/api/auth/login`, {
    body: JSON.stringify(body),
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data: { token: string; refreshToken: string }) => {
      accessToken = data.token;
      refreshToken = data.refreshToken;
    });

const logout = () =>
  fetch(`${apiUrl}/api/account/logout`, {
    method: "POST",
  });

const info = () =>
  fetch(`${apiUrl}/api/auth/info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
