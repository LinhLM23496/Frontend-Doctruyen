import { TokenType } from 'api/auths/types'
import { UserInfoType } from 'api/users/types'

export type UseUsersType = {
  user: UserInfoType | null
  cached_usersDetail: {
    [_id: string]: UserInfoType | null
  }
  isLoading: boolean
  getUser: (userId?: string) => Promise<void>
  setUser: (value: UserInfoType) => void
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
