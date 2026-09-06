import type { PostDetailsResponse } from "./postDetails.interface";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";
import axios from "axios";

export async function getSinglePost(id: string) {
  try {
    const response = await axiosInterceptor.get<PostDetailsResponse>(
      `/posts/${id}`,
    );
    return response.data.data.post;
  } catch (err) {
    if (axios.isAxiosError<{ message: string }>(err)) {
      throw new Error(err.response?.data?.message);
    }
    throw new Error("Network Error");
  }
}
