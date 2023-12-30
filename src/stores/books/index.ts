import { create } from 'zustand'
import { UseBookDetailType, UseBookType, UseSuggestionType } from './types'
import { booksAPI } from 'api'
import { objectEmpty } from 'lib/utils'

const initialStateBook = {
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

export const useBookStore = create<UseBookType>((set, get) => ({
  ...initialStateBook,
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
        page: pagingCurrent.page + 1
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
    set(() => initialStateBook)
  }
}))

const initialStateSuggestion = {
  data: [],
  cached_suggsetions: [],
  isLoading: false,
  error: ''
}

export const useSuggestionStore = create<UseSuggestionType>((set, get) => ({
  ...initialStateSuggestion,
  async getData() {
    try {
      set(() => ({ isLoading: true }))

      const books = get().cached_suggsetions

      if (books?.length) return set(() => ({ data: books }))

      const data = await booksAPI.getSuggestions()

      set((state) => ({
        cached_suggsetions: [...state.cached_suggsetions, ...data],
        data: data
      }))
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isLoading: false }))
    }
  },
  async refetch() {
    try {
      set(() => ({ cached_suggsetions: [] }))
      await get().getData()
    } catch (error: any) {
      set(() => ({ error: error.message }))
    }
  },
  clear() {
    set(() => initialStateSuggestion)
  }
}))

const initialStateBookDetail = {
  data: null,
  cached_booksDetail: {},
  isLoading: false,
  error: ''
}

export const useBookDetailStore = create<UseBookDetailType>((set, get) => ({
  ...initialStateBookDetail,
  async getData(bookId: string) {
    try {
      set(() => ({ isLoading: true }))

      const cachedBook = get().cached_booksDetail[bookId]

      if (objectEmpty(cachedBook)) return set(() => ({ data: cachedBook }))

      const data = await booksAPI.getBookDetail({ bookId })

      set((state) => ({
        cached_booksDetail: { ...state.cached_booksDetail, [bookId]: data },
        data
      }))
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isLoading: false }))
    }
  },
  async refetch(bookId: string) {
    try {
      await set((state) => ({
        cached_booksDetail: { ...state.data, [bookId]: {} }
      }))
      await get().getData(bookId)
    } catch (error: any) {
      set(() => ({ error: error.message }))
    }
  },
  clear() {
    set(() => initialStateSuggestion)
  }
}))
