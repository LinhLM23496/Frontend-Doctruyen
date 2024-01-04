import { ResponsePagingType } from 'api/types'

export type BookDetailType = {
  author: string
  category: string[]
  chapters: number
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
}

export type ListBookParams = {
  key: string
  page: number
  limit?: number
}

export type ListBookReponse = Omit<ResponsePagingType, 'data'> & {
  data: BookShortType[]
}
