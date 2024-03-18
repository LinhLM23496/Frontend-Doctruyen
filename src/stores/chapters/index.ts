import { create } from 'zustand'
import {
  UseChapterType,
  GetChaptersType,
  UseChapterDetailType,
  UseNewUpdateType
} from './types'
import { chaptersAPI } from 'api'
import { LIMIT, objectEmpty } from 'lib'

const initialState = {
  data: [],
  paging: {
    page: 1,
    limit: 40,
    total: 1,
    totalPages: 1
  },
  cached_chapters: {},
  isLoading: false,
  isRefetching: false,
  hasNextPage: false,
  isFetching: false, // chưa biết xài cho gì
  isFetched: false,
  isFetchingNextPage: false,
  error: ''
}

export const useChapterStore = create<UseChapterType>((set, get) => ({
  ...initialState,
  async getData({ bookId, page = 1, odir = 'asc' }: GetChaptersType) {
    try {
      set(() => ({ isLoading: true, isFetched: false }))

      const chapters = get().cached_chapters[bookId]?.[odir]?.[page]

      if (chapters?.data?.length && chapters.paging) {
        return set(() => ({
          data: chapters.data,
          paging: chapters.paging,
          hasNextPage: page < chapters.paging.totalPages
        }))
      }

      const { data, paging } = await chaptersAPI.getListChapter({
        bookId,
        page,
        limit: 50,
        odir
      })

      set((state) => ({
        data: data,
        paging,
        hasNextPage: page < paging.totalPages,
        cached_chapters: {
          ...state.cached_chapters,
          [bookId]: {
            ...state.cached_chapters[bookId],
            [odir]: {
              ...state.cached_chapters[bookId]?.[odir],
              [page]: { data, paging }
            }
          }
        }
      }))
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isLoading: false, isFetched: true }))
    }
  },
  async refetch(params: GetChaptersType) {
    try {
      set(() => ({
        isRefetching: true,
        cached_chapters: {
          [params?.bookId]: {}
        }
      }))
      await get().getData(params)
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isRefetching: false }))
    }
  },
  clear() {
    set(() => initialState)
  }
}))

const initialStateChapterDetail = {
  data: null,
  cached_chaptersDetail: {},
  isLoading: false,
  error: ''
}

export const useChapterDetailStore = create<UseChapterDetailType>(
  (set, get) => ({
    ...initialStateChapterDetail,
    async getData(chapterId: string) {
      try {
        set(() => ({ isLoading: true }))

        const cachedBook = get().cached_chaptersDetail[chapterId]

        if (cachedBook && !objectEmpty(cachedBook)) {
          set(() => ({ data: cachedBook }))
          return cachedBook
        }

        const data = await chaptersAPI.getChapter(chapterId)

        set((state) => ({
          cached_chaptersDetail: {
            ...state.cached_chaptersDetail,
            [chapterId]: data
          },
          data
        }))

        return data
      } catch (error: any) {
        set(() => ({ error: error.message }))
      } finally {
        set(() => ({ isLoading: false }))
      }
    },
    async refetch(chapterId: string) {
      try {
        set((state) => ({
          cached_chaptersDetail: {
            ...state.cached_chaptersDetail,
            [chapterId]: null
          }
        }))
        await get().getData(chapterId)
      } catch (error: any) {
        set(() => ({ error: error.message }))
      }
    },
    clear() {
      set(() => initialStateChapterDetail)
    }
  })
)

const initialNewUpdate = {
  data: [],
  data_first_page: [],
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

export const useNewUpdateStore = create<UseNewUpdateType>((set, get) => ({
  ...initialNewUpdate,
  async getData({ page = 1, ...rest }) {
    try {
      if (page === 1) {
        set(() => ({ isLoading: true, isFetched: false }))
      }

      const isSaveCache = !rest?.search?.length && !rest?.categories?.length

      // get cache for not search and not filter
      if (isSaveCache) {
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
        }
      }

      const { data, paging } = await chaptersAPI.getListNewUpdate({
        ...rest,
        page,
        limit: LIMIT
      })

      // set cache for not search and not filter
      if (isSaveCache) {
        set((state) => ({
          data_first_page: page === 1 ? data : state.data_first_page,
          cached_data: {
            ...state.cached_data,
            [page]: { data, paging }
          }
        }))
      }

      set((state) => ({
        data: page === 1 ? data : [...state.data, ...data],
        currentPage: page,
        hasNextPage: paging.totalPages > page
      }))
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({
        isLoading: false,
        isFetched: true
      }))
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
  clear() {
    set(() => initialNewUpdate)
  }
}))
