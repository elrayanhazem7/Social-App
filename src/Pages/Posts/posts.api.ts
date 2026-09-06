import type { Post } from "./posts.interface";
import type { CommentsResponse } from "./CommentCard/commsent.interface";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";
import axios from "axios";

interface PostsResponse {
  data: {
    posts: Post[];
  };
}

export function getPostComments(postId: string) {
  try {
    const response = axiosInterceptor.get<CommentsResponse>(
      `/posts/${postId}/comments`,
    );
    return response;
  } catch (err) {
    if (axios.isAxiosError<{ message: string }>(err)) {
      throw new Error(err.response?.data?.message);
    }
    throw new Error("Network Error");
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await axiosInterceptor.get<PostsResponse>("/posts");
    return response.data.data.posts;
  } catch (err) {
    if (axios.isAxiosError<{ message: string }>(err)) {
      throw new Error(err.response?.data?.message);
    }
    throw new Error("Network Error");
  }
}
// like & unLike
export function LikePost(postId : string){
    return axiosInterceptor.put(`posts/${postId}/like`,{} )
  }
