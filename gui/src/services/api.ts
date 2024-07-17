import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:15987/api/",
  // baseURL: "https://localhost:7164/api/",
  timeout: undefined, // todo
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
