import axios from "axios";
import { router } from "../Routing/AppRouter/AppRouter";

export const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInterceptor.interceptors.request.use(
  function (request) {
    if (localStorage.getItem("user_token")) {
      request.headers.token = localStorage.getItem("user_token");
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
);
axiosInterceptor.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if(error.response && error.response.status=== 401){
        router.navigate('/login')
    }
    return Promise.reject(error);
  },
);
