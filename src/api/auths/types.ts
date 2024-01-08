import { UserInfoType } from 'api/users/types'

export type LoginData = {
  email: string
  password: string
}

export type RegisterData = {
  displayName: string
  email: string
  password: string
}

export type ChangePasswordByCodeData = {
  email: string
  password: string
  code: string
}

export type TokenType = {
  accessToken: string
  refreshToken: string
}

export type LoginReponse = {
  token: TokenType
  userInfo: UserInfoType
}
