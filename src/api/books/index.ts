import client from 'api/client'
import { ResponsePagingType } from 'api/types'

export const getListBook = async (params: { page: number; limit?: number }): Promise<ResponsePagingType> =>
  await client.get('/books', { params })
