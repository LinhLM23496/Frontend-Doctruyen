import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import { NotificationType } from 'api/notifications/types'
import { PagingType, ParamsPageType } from 'api/types'

export type UseNotifType = {
  data: NotificationType[]
  currentPage: number
  cached_data: {
    [page: number]: { data: NotificationType[]; paging: PagingType }
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
  addNotif: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => void
  readNotif: (_id?: string, messageId?: string) => Promise<void>
  readAllNotif: () => Promise<void>
}

export type UseUnReadNotifType = {
  isLoading: boolean
  amount: number
  getAmount: () => Promise<void>
  setAmount: (amount: number) => void
  incrementAmount: (value?: number) => void
  decrementAmount: (value?: number) => void
  clearAmount: () => void
}
