import client from 'api/client'
import { ResponsePagingType } from 'api/types'
import { BookDetailType } from './types'

export const getListBook = async (params: {
  page: number
  limit?: number
}): Promise<ResponsePagingType> => await client.get('/books', { params })

export const getBookDetail = async (params: {
  bookId: string
}): Promise<BookDetailType> => await client.get('/book', { params })
