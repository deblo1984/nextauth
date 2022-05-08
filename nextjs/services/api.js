import Axios from "axios";

let urls = {
  development: "http://localhost:5000",
  production: "https://ada-ada-aja.com",
};

const api = Axios.create({
  baseUrl: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
