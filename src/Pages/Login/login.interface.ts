
export interface LoginResponse {
  success: boolean
  message: "signed in successfully" | "incorrect email or password"
  data: Data
  errors : string 
}

export interface Data {
  data: any
  token: string
  tokenType: string
  expiresIn: string
  user: User
}

export interface User {
   _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  gender: string
  photo: string
  cover: string
  bookmarks: any[]
  followers: any[]
  following: any[]
  createdAt: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}

