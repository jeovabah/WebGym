import axios from "axios";

export const Api = axios.create({
  baseURL: "https://apigym-production.up.railway.app/",
});
