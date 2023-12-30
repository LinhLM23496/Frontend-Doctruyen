import { ResponsePagingType } from 'api/types'

export type GetListChapterParams = {
  bookId: string
  page: number
  limit?: number
  odir: 'asc' | 'desc'
}

export type ChapterShort = {
  _id: string
  title: string
  numberChapter: number
}
export type GetListChapterReponse = Omit<ResponsePagingType, 'data'> & {
  data: ChapterShort[]
}
