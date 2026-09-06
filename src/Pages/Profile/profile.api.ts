import axios from "axios";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";


export function getProfilePosts(userId : string){
    try {
        const response =axiosInterceptor.get(`/users/${userId}/posts`);
        return response
      } catch (err) {
        if (axios.isAxiosError<{ message: string }>(err)) {
          throw new Error(err.response?.data?.message);
        }
        throw new Error("Network Error");
      }
}


