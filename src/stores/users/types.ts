import { TokenType } from 'api/auths/types'
import { UserInfoType } from 'api/users/types'

export type UseUsersType = {
  data: UserInfoType | null
  cached_usersDetail: {
    [_id: string]: UserInfoType | null
  }
  isLoading: boolean
  getData: (userId?: string) => Promise<void>
  setData: (value: UserInfoType) => void
  refetch: (userId: string) => Promise<void>
  clear: () => void
  error: string
}

export type UseTokenType = {
  data?: TokenType
  cached_tokenDetail?: TokenType
  isLoading: boolean
  setData: (value: TokenType) => void
  refetch: () => Promise<void>
  clear: () => void
  error: string
}

export type HistoryType = {
  bookId: string
  nameBook?: string
  cover?: string
  chapterId?: string
  nameChapter?: string
  nunberChapter?: number
  createdAt: Date
}

export type UseHistoryType = {
  history: HistoryType[]
  addHistory: (value: Omit<HistoryType, 'createdAt'>) => void
  clear: () => void
}
