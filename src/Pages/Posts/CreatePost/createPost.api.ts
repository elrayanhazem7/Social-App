import axios from "axios";
import type { CreatePostResponse } from "./createPost.interface";
import { axiosInterceptor } from "../../../axiosInterceptor/axiosInterceptor";

export async function createUserPost(data: FormData): Promise<string> {
  try {
    const response = await axiosInterceptor.post<CreatePostResponse>(
      `/posts`,
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
