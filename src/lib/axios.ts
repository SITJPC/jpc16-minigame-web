import Axios from "axios";

const httpClient = Axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

export default httpClient;
