export interface Post {
  _id: string;
  id: string;

  image: string | null;
  privacy: "public" | "private";
  body : string;
  user: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };

  sharedPost: Post | null;

  likes: unknown[];
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  topComment: Comment | null;

  sharesCount: number;

  createdAt: string;

  isShare: boolean;
  bookmarked: boolean;
}


export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  likes: any[];
  image?: string;
  commentCreator: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
}