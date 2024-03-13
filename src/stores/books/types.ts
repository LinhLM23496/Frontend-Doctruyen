import { BookDetailType, BookShortType } from 'api/books/types'
import { PagingType } from 'api/types'

export type Params = {
  search?: string
  page?: number
  [filter: string]: any
}

export type UseBookType = {
  data: BookShortType[]
  cached_data: {
    [page: number]: { data: BookShortType[]; paging: PagingType }
  }
  currentPage: number
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
  updateLike: (bookId: string, status: 0 | 1) => void
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
  updateLike: (bookId: string, status: 0 | 1) => void
}

export type UseBookDetailType = {
  data: BookDetailType | null
  cached_data: {
    [bookId: string]: BookDetailType | null
  }
  isLoading: boolean
  getData: (
    bookId: string,
    userId?: string
  ) => Promise<BookDetailType | undefined>
  refetch: (bookId: string) => Promise<void>
  clear: () => void
  error: string
  updateLike: (bookId: string, status: 0 | 1) => void
}
