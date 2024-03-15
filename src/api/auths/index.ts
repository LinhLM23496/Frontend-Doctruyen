import client from 'api/client'
import {
  ChangePasswordByCodeData,
  LoginData,
  TokenType,
  RegisterData,
  LoginReponse
} from './types'
import { UserInfoType } from 'api/users/types'
import { STORAGE_KEY, getStorage } from 'stores'

export const refreshToken = async (data: {
  refreshToken: string
}): Promise<Omit<TokenType, 'refreshToken'>> =>
  await client.post('/refreshToken', data)

export const register = async (data: RegisterData): Promise<UserInfoType> =>
  await client.post('/auth/register', data)

export const login = async (data: LoginData): Promise<LoginReponse> =>
  await client.post('/auth/login', {
    ...data,
    fcmToken: getStorage(STORAGE_KEY.FCM_TOKEN)
  })

export const forgotPassword = async (data: {
  email: string
}): Promise<string> => await client.post('/auth/forgotPassword', data)

export const changePasswordByCode = async (
  data: ChangePasswordByCodeData
): Promise<string> => await client.put('/auth/changePasswordByCode', data)
