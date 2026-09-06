export type DropDownCommentProps = {
  commentId: string;
  userId: string;
  postId: string;
};

export type CommentFormData = {
  content: string;
  image: string;
};

export type EditCommentResponse = {
  message: string;
};