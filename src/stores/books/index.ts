import { create } from 'zustand'
import { UseBookDetailType, UseBookType, UseSuggestionType } from './types'
import { booksAPI } from 'api'
import { NavigationService } from 'navigation'
import { LIMIT, objectEmpty } from 'lib'

const initialBook = {
  data: [],
  cached_data: {},
  currentPage: 1,
  paging: {
    page: 1,
    limit: LIMIT,
    total: 0,
    totalPages: 1
  },
  isLoading: false,
  isRefetching: false,
  hasNextPage: false,
  isFetching: false, // chưa biết xài cho gì
  isFetched: false,
  isFetchingNextPage: false,
  error: ''
}

export const useBookStore = create<UseBookType>((set, get) => ({
  ...initialBook,
  async getData({ page = 1, ...rest }) {
    try {
      if (page === 1) {
        set(() => ({ isLoading: true, isFetched: false }))
      }

      const isSaveCache =
        !rest?.search?.length &&
        !rest?.categories?.length &&
        rest?.order === 'likes' &&
        rest?.odir === 'desc'

      // get cache for not search and not filter
      if (isSaveCache) {
        const { data: dataCache, paging: pagingCache } =
          get()?.cached_data?.[page] ?? {}

        if (dataCache?.length && pagingCache) {
          return set((state) => ({
            data: page === 1 ? dataCache : [...state.data, ...dataCache],
            currentPage: page,
            hasNextPage: pagingCache.totalPages > page
          }))
        }
      }

      const { data, paging } = await booksAPI.getListBook({
        ...rest,
        page,
        limit: LIMIT
      })

      // set cache for not search and not filter
      if (isSaveCache) {
        set((state) => ({
          cached_data: {
            ...state.cached_data,
            [page]: { data, paging }
          }
        }))
      }

      set((state) => ({
        data: page === 1 ? data : [...state.data, ...data],
        paging,
        hasNextPage: page < paging.totalPages
      }))
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isLoading: false, isFetched: true }))
    }
  },
  async refetch(params) {
    try {
      set(() => ({ isRefetching: true, cached_data: {} }))
      await get().getData({ ...params, page: 1 })
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isRefetching: false }))
    }
  },
  async fetchNextPage(params) {
    const { hasNextPage, isFetchingNextPage, isLoading, isRefetching } = get()

    if (!hasNextPage || isFetchingNextPage || isLoading || isRefetching) {
      return
    }

    try {
      set(() => ({ isFetchingNextPage: true }))

      const pagingCurrent = get().currentPage

      await get().getData({ ...params, page: pagingCurrent + 1 })
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isFetchingNextPage: false }))
    }
  },
  updateLike(bookId: string, status: 0 | 1) {
    if (!bookId) return
    set((state) => ({
      data: state.data.map((book) => {
        if (book._id === bookId) {
          return {
            ...book,
            likes: status ? book.likes + 1 : book.likes - 1
          }
        }
        return book
      }),
      cached_data: {}
    }))
  },
  clear() {
    set(() => initialBook)
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
  updateLike(bookId: string, status: 0 | 1) {
    if (!bookId) return
    set((state) => ({
      data: state.data.map((book) => {
        if (book._id === bookId) {
          return {
            ...book,
            ownerLike: status,
            likes: status ? book.likes + 1 : book.likes - 1
          }
        }
        return book
      }),
      cached_suggsetions: state.cached_suggsetions.map((book) => ({
        ...book,
        likes:
          book._id === bookId
            ? status
              ? book.likes + 1
              : book.likes - 1
            : book.likes
      }))
    }))
  },
  clear() {
    set(() => initialStateSuggestion)
  }
}))

const initialStateBookDetail = {
  data: null,
  cached_data: {},
  isLoading: false,
  error: ''
}

export const useBookDetailStore = create<UseBookDetailType>((set, get) => ({
  ...initialStateBookDetail,
  async getData(bookId, userId = '') {
    try {
      set(() => ({ isLoading: true }))

      const cachedBook = get().cached_data[bookId]

      if (cachedBook && !objectEmpty(cachedBook)) {
        set(() => ({ data: cachedBook }))
        return cachedBook
      }

      const data = await booksAPI.getBookDetail(bookId, { userId })

      set((state) => ({
        cached_data: { ...state.cached_data, [bookId]: data },
        data
      }))

      return data
    } catch (error: any) {
      set(() => ({ error: error.message }))
      NavigationService.goBack()
    } finally {
      set(() => ({ isLoading: false }))
    }
  },
  async refetch(bookId: string) {
    try {
      set((state) => ({
        cached_data: { ...state.cached_data, [bookId]: null }
      }))
      await get().getData(bookId)
    } catch (error: any) {
      set(() => ({ error: error.message }))
    }
  },
  updateLike(bookId: string, status: 0 | 1) {
    if (!bookId) return

    const bookCached = get().cached_data?.[bookId]

    if (!bookCached || objectEmpty(bookCached)) return

    const newBook = {
      ...bookCached,
      ownerLike: status,
      likes: status ? bookCached.likes + 1 : bookCached.likes - 1
    }

    set((state) => ({
      cached_data: {
        ...state.cached_data,
        [bookId]: newBook
      },
      data: newBook
    }))
  },
  clear() {
    set(() => initialStateBookDetail)
  }
}))
