import { create } from 'zustand'
import {
  UseHistoryType,
  UseLikeType,
  UseTokenType,
  UseUsersType
} from './types'
import { authsAPI, likeAPI, usersAPI } from 'api'
import { AMOUNT_OF_HISTORY, LIMIT, objectEmpty } from 'lib'
import { createJSONStorage, persist } from 'zustand/middleware'
import { historyStorage, tokenStorage, userStorage } from 'stores/mmkv'
import moment from 'moment'
import { LikeType } from 'api/likes/types'

const initialStateTokenDetail = {
  token: undefined,
  cached_tokenDetail: undefined,
  isLoading: false,
  error: ''
}

export const useTokenStore = create<UseTokenType>()(
  persist(
    (set, get) => ({
      ...initialStateTokenDetail,
      setToken(value) {
        set({ token: value })
      },
      async refetch() {
        const { refreshToken } = get().token || {}
        if (!refreshToken) return

        const { accessToken } = await authsAPI.refreshToken({ refreshToken })

        set({ token: { refreshToken, accessToken } })
      },
      clearToken() {
        set(() => initialStateTokenDetail)
      }
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => tokenStorage)
    }
  )
)

const initialStateUsersDetail = {
  user: null,
  myUserId: '',
  cached_usersDetail: {},
  isLoading: false,
  error: ''
}

export const useUsersStore = create<UseUsersType>()(
  persist(
    (set, get) => ({
      ...initialStateUsersDetail,
      async getUser(userId) {
        try {
          set(() => ({ isLoading: true }))

          const id = userId ?? get().myUserId

          if (!id || id?.length <= 0) {
            return set(() => ({ error: 'Lỗi không tìm được ID', user: null }))
          }

          const cachedUser = get().cached_usersDetail[id]

          if (!objectEmpty(cachedUser)) {
            return set(() => ({ user: cachedUser }))
          }

          const data = await usersAPI.getUserInfo({ userId: id })

          set((state) => ({
            cached_usersDetail: {
              ...state.cached_usersDetail,
              [data._id]: data
            },
            user: data
          }))
        } catch (error: any) {
          set(() => ({ error: error.message, user: null }))
        } finally {
          set(() => ({ isLoading: false }))
        }
      },
      setUser(value) {
        set((state) => ({
          cached_usersDetail: {
            ...state.cached_usersDetail,
            [value._id]: value
          },
          user: value
        }))
      },
      setMyUserId(userId) {
        set(() => ({ myUserId: userId }))
      },
      async refetch(userId) {
        try {
          set({ cached_usersDetail: {} })
          await get().getUser(userId)
        } catch (error: any) {
          set(() => ({ error: error.message }))
        }
      },
      clearUser() {
        set(() => initialStateUsersDetail)
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => userStorage)
    }
  )
)

const initialStateHistoryDetail = {
  history: []
}

export const useHistoryStore = create<UseHistoryType>()(
  persist(
    (set) => ({
      ...initialStateHistoryDetail,
      addHistory(value) {
        set((state) => {
          const existingIndex = state.history.findIndex(
            (h) => h.bookId === value.bookId
          )

          if (existingIndex !== -1) {
            // Mục đã tồn tại, cập nhật và đưa lên đầu danh sách
            const updatedHistory = [
              {
                ...state.history[existingIndex],
                ...value,
                createdAt: new Date()
              },
              ...state.history.slice(0, existingIndex),
              ...state.history.slice(existingIndex + 1)
            ]

            return {
              history: updatedHistory.slice(0, AMOUNT_OF_HISTORY) // Giới hạn số lượng mục
            }
          }

          // Mục mới, thêm vào đầu danh sách
          const newHistory = [
            { ...value, createdAt: new Date() },
            ...state.history
          ]

          return {
            history: newHistory.slice(0, AMOUNT_OF_HISTORY) // Giới hạn số lượng mục
          }
        })
      },
      clear() {
        set(() => initialStateHistoryDetail)
      }
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => historyStorage)
    }
  )
)

const initailLikes = {
  data: [],
  data_first_page: [],
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

export const useLikeStore = create<UseLikeType>((set, get) => ({
  ...initailLikes,
  async getData({ page = 1 }) {
    try {
      if (page === 1) {
        set(() => ({ isLoading: true, isFetched: false }))
      }

      const { data: dataCache, paging: pagingCache } =
        get()?.cached_data?.[page] ?? {}

      const { data: dataFirstCache } = get()?.cached_data?.[1] ?? {}

      if (dataCache?.length && pagingCache) {
        return set((state) => ({
          data: page === 1 ? dataCache : [...state.data, ...dataCache],
          data_first_page: dataFirstCache ?? [],
          currentPage: page,
          hasNextPage: pagingCache.totalPages > page
        }))
      } else {
        const { data, paging } = await likeAPI.getListLike({
          page,
          limit: LIMIT
        })

        set((state) => ({
          data: page === 1 ? data : [...state.data, ...data],
          data_first_page: page === 1 ? data : state.data_first_page,
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
      set(() => ({
        isLoading: false,
        isFetched: true
      }))
    }
  },
  async refetch() {
    try {
      set(() => ({
        isRefetching: true,
        cached_data: {}
      }))
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
  updateLike(book, status) {
    if (!book?._id) return

    const jsonUser = userStorage?.getItem('user-storage') as any
    const user = JSON.parse(jsonUser)
    const userId = user?.state?.myUserId

    if (!userId) {
      return console.log('user not found')
    }

    const newLike: LikeType = {
      _id: moment().toString(),
      user: userId,
      book,
      createdAt: new Date()
    }

    set((state) => ({
      data: status
        ? [newLike, ...state.data]
        : state?.data?.filter((item) => item.book._id !== book._id),
      data_first_page: status
        ? [newLike, ...state.data_first_page]
        : state?.data_first_page?.filter((item) => item.book._id !== book._id)
    }))
  },
  clear() {
    set(() => initailLikes)
  }
}))
