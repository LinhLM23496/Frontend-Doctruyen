import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { bookStorage } from '../mmkv'
import { UseBookType } from './types'
import { booksAPI } from 'api'

const initialState = {
  data: [],
  paging: {
    page: 1,
    limit: 0,
    total: 0,
    totalPages: 1
  },
  cached_books: [],
  isLoading: false,
  isRefetching: false,
  hasNextPage: false,
  isFetching: false, // chưa biết xài cho gì
  isFetched: false,
  isFetchingNextPage: false,
  error: ''
}

export const useBookStore = create(
  persist<UseBookType>(
    (set, get) => ({
      ...initialState,
      setData(newData) {
        set(() => ({ data: newData, cached_books: newData }))
      },
      async getData(page: number) {
        try {
          set(() => ({ isLoading: true, isFetched: false }))

          const books = get().cached_books

          if (books?.length) return set(() => ({ data: books }))

          const { data, paging } = await booksAPI.getListBook({
            page,
            limit: 2
          })

          set((state) => ({
            cached_books: [...state.cached_books, ...data],
            data: data,
            paging,
            hasNextPage: page < paging.totalPages
          }))
        } catch (error: any) {
          set(() => ({ error: error.message }))
        } finally {
          set(() => ({ isLoading: false, isFetched: true }))
        }
      },
      async refetch() {
        try {
          set(() => ({ isRefetching: true, cached_books: [] }))
          await get().getData(1)
        } catch (error: any) {
          set(() => ({ error: error.message }))
        } finally {
          set(() => ({ isRefetching: false }))
        }
      },
      async fetchNextPage() {
        if (!get().hasNextPage) return

        try {
          set(() => ({ isFetchingNextPage: true }))

          const pagingCurrent = get().paging
          const { data, paging } = await booksAPI.getListBook({
            page: pagingCurrent.page + 1,
            limit: 2
          })

          set((state) => ({
            cached_books: [...state.cached_books, ...data],
            data: [...state.data, ...data],
            paging,
            hasNextPage: pagingCurrent.page + 1 < paging.totalPages
          }))
        } catch (error: any) {
          set(() => ({ error: error.message }))
        } finally {
          set(() => ({ isFetchingNextPage: false }))
        }
      },
      clear() {
        set(() => initialState)
        bookStorage.removeItem('bookStore')
      }
    }),
    {
      name: 'book-storage',
      storage: createJSONStorage(() => bookStorage)
    }
  )
)
