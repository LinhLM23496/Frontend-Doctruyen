import { create } from 'zustand'
import { UseHistoryType, UseTokenType, UseUsersType } from './types'
import { authsAPI, usersAPI } from 'api'
import { AMOUNT_OF_HISTORY, objectEmpty } from 'lib'
import { createJSONStorage, persist } from 'zustand/middleware'
import { historyStorage, tokenStorage, userStorage } from 'stores/mmkv'

const initialStateTokenDetail = {
  data: undefined,
  cached_tokenDetail: undefined,
  isLoading: false,
  error: ''
}

export const useTokenStore = create<UseTokenType>()(
  persist(
    (set, get) => ({
      ...initialStateTokenDetail,
      setData(value) {
        set({ data: value })
      },
      async refetch() {
        const { refreshToken } = get().data || {}
        if (!refreshToken) return

        const { accessToken } = await authsAPI.refreshToken({ refreshToken })

        set({ data: { refreshToken, accessToken } })
      },
      clear() {
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
  data: null,
  cached_usersDetail: {},
  isLoading: false,
  error: ''
}

export const useUsersStore = create<UseUsersType>()(
  persist(
    (set, get) => ({
      ...initialStateUsersDetail,
      async getData(userId) {
        try {
          set(() => ({ isLoading: true }))
          if (userId) {
            const cachedUser = get().cached_usersDetail[userId]

            if (objectEmpty(cachedUser)) {
              return set(() => ({ data: cachedUser }))
            }
          }

          const data = await usersAPI.getUserInfo({ userId })

          set((state) => ({
            cached_usersDetail: {
              ...state.cached_usersDetail,
              [data._id]: data
            },
            data
          }))
        } catch (error: any) {
          set(() => ({ error: error.message }))
        } finally {
          set(() => ({ isLoading: false }))
        }
      },
      setData(value) {
        set((state) => ({
          cached_usersDetail: {
            ...state.cached_usersDetail,
            [value._id]: value
          },
          data: value
        }))
      },
      async refetch(userId) {
        try {
          set((state) => ({
            cached_usersDetail: {
              ...state.cached_usersDetail,
              [userId]: null
            }
          }))
          await get().getData(userId)
        } catch (error: any) {
          set(() => ({ error: error.message }))
        }
      },
      clear() {
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
