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

export type GetChapterReposne = {
  _id: string
  title: string
  numberChapter: number
  bookId: string
  content: string
  cover: string
  description: string
  likes: string
  views: string
  updatedAt: Date
  createdAt: Date
  createdBy: string
  previousId?: string | null
  nextId?: string | null
}
