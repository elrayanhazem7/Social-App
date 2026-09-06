import axios from "axios";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";
import type { EditCommentResponse } from "./DropDownComment.interface";

// Delete Comment
export function deletComment({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) {
  const response = axiosInterceptor.delete(
    `/posts/${postId}/comments/${commentId}`,
  );
  return response;
}

//  Edit Comment
export async function editComment({
  formData,
  postId,
  commentId,
}: {
  formData: FormData;
  postId: string;
  commentId: string;
}): Promise<string> {
  try {
    const response =
      await axiosInterceptor.put<EditCommentResponse>(
        `/posts/${postId}/comments/${commentId}`,
        formData
      );

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to edit comment"
      );
    }

    throw new Error("Network Error");
  }
}