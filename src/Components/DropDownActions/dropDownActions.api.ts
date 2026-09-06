import axios from "axios";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";
import type { CreatePostResponse } from "../../Pages/Posts/CreatePost/createPost.interface";

// deletePost
export function deletePost(postId: string) {
  const response = axiosInterceptor.delete(`/posts/${postId}`);
  return response;
}

// update

export async function editPost(
  data: FormData,
  postId: string,
): Promise<string> {
  try {
    const response = await axiosInterceptor.put<CreatePostResponse>(
      `/posts/${postId}`,
      data,
    );

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      throw new Error(error.response?.data?.message || "Failed to update post");
    }

    throw new Error("Network Error");
  }
}
