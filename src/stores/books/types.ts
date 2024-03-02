import { BookDetailType, BookShortType } from 'api/books/types'
import { PagingType } from 'api/types'

export type Params = {
  search?: string
  page?: number
  [filter: string]: any
}

export type UseBookType = {
  data: BookShortType[]
  paging: PagingType
  isLoading: boolean
  getData: (params: Params) => Promise<void>
  isRefetching: boolean
  refetch: (params: Params) => Promise<void>
  hasNextPage: boolean
  isFetching: boolean
  isFetched: boolean
  isFetchingNextPage: boolean
  fetchNextPage: (params: Params) => Promise<void>
  clear: () => void
  error: string
}

export type BookType = {
  _id: string
}

export type UseSuggestionType = {
  data: BookShortType[]
  cached_suggsetions: BookShortType[]
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
  getData: (bookId: string) => Promise<BookDetailType | undefined>
  refetch: (bookId: string) => Promise<void>
  clear: () => void
  error: string
}
