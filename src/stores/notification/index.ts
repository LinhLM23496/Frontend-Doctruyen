import { create } from 'zustand'
import { UseNotifType } from './type'
import { notificationAPI } from 'api'
import { LIMIT } from 'lib'
import { NotificationType } from 'api/notifications/types'

const initailNotif = {
  data: [],
  currentPage: 1,
  cached_data: {},
  isLoading: false,
  isRefetching: false,
  hasNextPage: false,
  isFetching: false, // chưa biết xài cho gì
  isFetched: false,
  isFetchingNextPage: false,
  error: ''
}

export const useNotifStore = create<UseNotifType>((set, get) => ({
  ...initailNotif,
  async getData({ page = 1 }) {
    try {
      if (page === 1) {
        set(() => ({ isLoading: true, isFetched: false }))
      }

      const { data: dataCache, paging: pagingCache } =
        get()?.cached_data?.[page] ?? {}

      if (dataCache?.length && pagingCache) {
        return set((state) => ({
          data: page === 1 ? dataCache : [...state.data, ...dataCache],
          currentPage: page,
          hasNextPage: pagingCache.totalPages > page
        }))
      } else {
        const { data, paging } = await notificationAPI.getListNotification({
          page,
          limit: LIMIT
        })

        set((state) => ({
          data: page === 1 ? data : [...state.data, ...data],
          currentPage: page,
          hasNextPage: paging.totalPages > page,
          cached_data: {
            ...state.cached_data,
            [page]: { data, paging }
          }
        }))
      }
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isLoading: false, isFetched: true }))
    }
  },
  async refetch() {
    try {
      set(() => ({ isRefetching: true, cached_data: {} }))
      await get().getData({ page: 1 })
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isRefetching: false }))
    }
  },
  async fetchNextPage() {
    const { hasNextPage, isFetchingNextPage, isLoading, isRefetching } = get()

    if (!hasNextPage || isFetchingNextPage || isLoading || isRefetching) {
      return
    }

    try {
      set(() => ({ isFetchingNextPage: true }))

      const pagingCurrent = get().currentPage

      await get().getData({ page: pagingCurrent + 1 })
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isFetchingNextPage: false }))
    }
  },
  addNotif(remoteMessage) {
    const dataNotification: NotificationType = {
      _id: remoteMessage?.messageId ?? '',
      messageId: remoteMessage?.messageId ?? '',
      title: remoteMessage?.notification?.title ?? '',
      body: remoteMessage?.notification?.body ?? '',
      data: remoteMessage?.data as any,
      isRead: false,
      createdBy: 'system',
      user: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    set((state) => ({
      data: [dataNotification, ...state.data],
      cached_data: {
        ...state.cached_data,
        1: {
          ...state.cached_data?.[1],
          data: [dataNotification, ...(state.cached_data?.[1]?.data ?? [])]
        }
      }
    }))
  },
  async readNotif(_id, messageId) {
    if (!_id && !messageId) return

    try {
      _id
        ? await notificationAPI.readNotification(_id)
        : messageId
        ? await notificationAPI.readNotifByMessageId({ messageId })
        : null
      set((state) => {
        const cached = state.cached_data
        for (const key in cached) {
          if (cached.hasOwnProperty(key)) {
            cached[key].data = cached[key].data.map((item) =>
              item._id === _id || item.messageId === messageId
                ? { ...item, isRead: true }
                : item
            )
          }
        }
        return {
          cached_data: cached,
          data: state.data.map((item) =>
            item._id === _id || item.messageId === messageId
              ? { ...item, isRead: true }
              : item
          )
        }
      })
    } catch (error: any) {
      set(() => ({ error: error.message }))
    }
  },
  async readAllNotif() {
    await notificationAPI.readAllNotification()

    set((state) => {
      const cached = state.cached_data
      for (const key in cached) {
        if (cached.hasOwnProperty(key)) {
          cached[key].data = cached[key].data.map((item) => ({
            ...item,
            isRead: true
          }))
        }
      }
      return {
        cached_data: cached,
        data: state.data.map((item) => ({ ...item, isRead: true }))
      }
    })
  },
  clear() {
    set(() => initailNotif)
  }
}))
