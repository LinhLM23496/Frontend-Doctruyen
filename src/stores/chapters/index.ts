import { create } from 'zustand'
import { UseChapterType, GetChaptersType } from './types'
import { chaptersAPI } from 'api'

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
        limit: 40,
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
