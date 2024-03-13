import { TokenType } from 'api/auths/types'
import { LikeBookType, LikeType } from 'api/likes/types'
import { PagingType, ParamsPageType } from 'api/types'
import { UserInfoType } from 'api/users/types'

export type UseUsersType = {
  user: UserInfoType | null
  myUserId: string
  cached_usersDetail: {
    [_id: string]: UserInfoType | null
  }
  isLoading: boolean
  getUser: (userId?: string) => Promise<void>
  setUser: (value: UserInfoType) => void
  setMyUserId: (userId: string) => void
  refetch: (userId: string) => Promise<void>
  clearUser: () => void
  error: string
}

export type UseTokenType = {
  token?: TokenType
  cached_tokenDetail?: TokenType
  isLoading: boolean
  setToken: (value: TokenType) => void
  refetch: () => Promise<void>
  clearToken: () => void
  error: string
}

export type ChapterCardType = {
  bookId: string
  nameBook?: string
  cover?: string
  chapterId?: string
  nameChapter?: string
  nunberChapter?: number
  createdAt: Date
}

export type UseHistoryType = {
  history: ChapterCardType[]
  addHistory: (value: Omit<ChapterCardType, 'createdAt'>) => void
  clear: () => void
}

export type UseLikeType = {
  data: LikeType[]
  data_first_page: LikeType[]
  currentPage: number
  cached_data: {
    [page: number]: { data: LikeType[]; paging: PagingType }
  }
  isLoading: boolean
  getData: (params: ParamsPageType) => Promise<void>
  isRefetching: boolean
  refetch: () => Promise<void>
  hasNextPage: boolean
  isFetching: boolean
  isFetched: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => Promise<void>
  clear: () => void
  error: string
  updateLike: (book: LikeBookType, status: 0 | 1) => void
}
