import { ChapterShort, GetChapterReposne } from 'api/chapters/types'
import { PagingType } from 'api/types'

export type UseChapterType = {
  data: ChapterShort[]
  paging: PagingType
  cached_chapters: {
    [bookId: string]: {
      [odir: string]: {
        [page: number]: { data: ChapterShort[]; paging: PagingType }
      }
    }
  }
  isLoading: boolean
  getData: (params: GetChaptersType) => Promise<void>
  isRefetching: boolean
  refetch: (params: GetChaptersType) => Promise<void>
  hasNextPage: boolean
  isFetching: boolean
  isFetched: boolean
  isFetchingNextPage: boolean
  clear: (bookId: string) => void
  error: string
}

export type GetChaptersType = {
  bookId: string
  page?: number
  limit?: number
  odir?: 'asc' | 'desc'
}

export type UseChapterDetailType = {
  data: GetChapterReposne | null
  cached_chaptersDetail: {
    [chapterId: string]: GetChapterReposne | null
  }
  isLoading: boolean
  getData: (chapterId: string) => Promise<GetChapterReposne | undefined>
  refetch: (chapterId: string) => Promise<void>
  clear: () => void
  error: string
}
