import client from 'api/client'
import {
  BookDetailType,
  BookShortType,
  ListBookParams,
  ListBookReponse
} from './types'

export const getListBook = async (
  params: ListBookParams
): Promise<ListBookReponse> => await client.get('/books', { params })

export const getBookDetail = async (params: {
  bookId: string
}): Promise<BookDetailType> => await client.get('/book', { params })

export const getSuggestions = async (): Promise<BookShortType[]> =>
  await client.get('/books/suggestion')
