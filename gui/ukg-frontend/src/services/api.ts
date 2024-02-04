import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7164/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
