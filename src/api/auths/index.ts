import client from 'api/client'
import {
  ChangePasswordByCodeData,
  LoginData,
  TokenType,
  RegisterData,
  LoginReponse
} from './types'
import { ResponseDefaultType } from 'api/types'
import { UserInfoType } from 'api/users/types'

export const refreshToken = async (data: {
  refreshToken: string
}): Promise<Omit<TokenType, 'refreshToken'>> =>
  await client.post('/refreshToken', data)

export const register = async (data: RegisterData): Promise<UserInfoType> =>
  await client.post('/auth/register', data)

export const login = async (data: LoginData): Promise<LoginReponse> =>
  await client.post('/auth/login', data)

export const forgotPassword = async (data: {
  email: string
}): Promise<ResponseDefaultType> =>
  await client.post('/auth/forgotPassword', data)

export const changePasswordByCode = async (
  data: ChangePasswordByCodeData
): Promise<ResponseDefaultType> =>
  await client.put('/auth/changePasswordByCode', data)
