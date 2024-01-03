import { BookDetailType } from 'api/books/types'
import { PagingType } from 'api/types'

export type UseBookType = {
  data: any[]
  paging: PagingType
  cached_books: any[]
  isLoading: boolean
  getData: (page: number) => Promise<void>
  isRefetching: boolean
  refetch: () => Promise<void>
  hasNextPage: boolean
  isFetching: boolean
  isFetched: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => Promise<void>
  clear: () => void
  error: string
}

export type BookType = {
  _id: string
}

export type UseSuggestionType = {
  data: any[]
  cached_suggsetions: any[]
  isLoading: boolean
  getData: () => Promise<void>
  refetch: () => Promise<void>
  clear: () => void
  error: string
}

export type UseBookDetailType = {
  data: BookDetailType | null
  cached_booksDetail: {
    [bookId: string]: BookDetailType | null
  }
  isLoading: boolean
  getData: (bookId: string) => Promise<void>
  refetch: (bookId: string) => Promise<void>
  clear: () => void
  error: string
}
