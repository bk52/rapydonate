import axios from "axios";
import URL from "./urls";
import { Token } from "./token";


const api = axios.create({
  baseURL: URL.baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "apikey": "ZM86vZa8Vl",
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

api.interceptors.response.use((response) => {
  return response
}, function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    //console.log("Trying to get new token");
    originalRequest._retry = true;
    let token = localStorage.getItem("refreshToken");
    return api.post(URL.TOKEN, { token })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.token);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        return api(originalRequest);
      })
  }
  return Promise.reject(error);
});

function ErrorHandler(error) {
  //if (error.response && error.response.data) throw error.response.data;
  //else throw error;
}

export { api, ErrorHandler }