import { PagingType } from 'api/types'

export type UseBookType = {
  data: any[]
  paging: PagingType
  setData: (newData: any[]) => void
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
