import { ResponsePagingType } from 'api/types'

export type BookDetailType = {
  author: string
  categories: string[]
  chapters: number
  banner: string
  cover: string
  createAt: Date
  createBy: string
  description: string
  likes: number
  name: string
  updatedAt: Date
  views: number
  url: string
  _id: string
  status: 0 | 1 | 2
  firstChapterId: string
  lastChapterId: string
}

export type BookShortType = {
  chapters: number
  cover: string
  likes: number
  name: string
  views: number
  _id: string
  status: 0 | 1 | 2
}

export type ListBookParams = {
  search: string
  page: number
  limit?: number
}

export type ListBookReponse = Omit<ResponsePagingType, 'data'> & {
  data: BookShortType[]
}
