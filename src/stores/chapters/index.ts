import { create } from 'zustand'
import {
  UseChapterType,
  GetChaptersType,
  UseChapterDetailType,
  UseNewUpdateType
} from './types'
import { chaptersAPI } from 'api'
import { objectEmpty } from 'lib'

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

        if (cachedBook && objectEmpty(cachedBook)) {
          set(() => ({ data: cachedBook }))
          return cachedBook
        }

        const data = await chaptersAPI.getChapter({ chapterId })

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
  paging: {
    page: 1,
    limit: 0,
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
      set(() => ({ isLoading: true, isFetched: false }))

      const { data, paging } = await chaptersAPI.getListNewUpdate({
        ...rest,
        page
      })

      set({
        data: data,
        paging,
        hasNextPage: page < paging.totalPages
      })
    } catch (error: any) {
      set(() => ({ error: error.message }))
    } finally {
      set(() => ({ isLoading: false, isFetched: true }))
    }
  },
  async refetch(params) {
    try {
      set(() => ({ isRefetching: true }))
      await get().getData(params)
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

      const pagingCurrent = get().paging
      const { data, paging } = await chaptersAPI.getListNewUpdate({
        ...params,
        page: pagingCurrent.page + 1
      })

      set((state) => ({
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
    set(() => initialNewUpdate)
  }
}))
