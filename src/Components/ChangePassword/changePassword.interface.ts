
export interface ChangePasswordResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  token: string
  tokenType: string
  expiresIn: string
}
