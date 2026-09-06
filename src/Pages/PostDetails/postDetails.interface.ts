
export interface PostDetailsResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  post: Post
}

export interface Post {
  _id: string
  body: string
  image: string
  privacy: "public" | "private"
  user: User
  sharedPost: any
  likes: any[]
  createdAt: string
  commentsCount: number
  topComment: TopComment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
  isLiked: boolean;
}

export interface User {
  _id: string
  name: string
  username: string
  photo: string
}

export interface TopComment {
  _id: string
  content: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
}
