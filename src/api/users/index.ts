import client from 'api/client'
import { UserInfoType } from './types'

export const getUserInfo = (params: {
  userId?: string
}): Promise<UserInfoType> => client.get('/user', { params })

export const deleteUser = async (data: { id: string }) =>
  await client.delete('/user', { data })
