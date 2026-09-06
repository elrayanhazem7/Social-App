import axios from "axios";
import { axiosInterceptor } from "../../../axiosInterceptor/axiosInterceptor";

export async function addCreatConmment(data: FormData , id: string) {
    try {
      const response = await axiosInterceptor.post(
        `/posts/${id}/comments`,
        data,
      );

      return response.data.message;
    } catch (error) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Netwrok Error");
    }
  }