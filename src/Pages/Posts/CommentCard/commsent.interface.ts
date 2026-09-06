export interface CommentsResponse {
  success: boolean;
  message: string;
  data: {
    comments: Comment[];
  };
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
  post: string;
  parentComment: any;
  likes: any[];
  createdAt: string;
}