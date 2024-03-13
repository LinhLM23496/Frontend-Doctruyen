import { ResponsePagingType } from 'api/types'

export type LikeBookType = {
  _id: string
  name: string
  cover: string
  chapters: number
  status: number
  updatedAt: Date
}

export type LikeType = {
  _id: string
  user: string
  book: LikeBookType
  createdAt: Date
}

export type ListLikeReponse = Omit<ResponsePagingType, 'data'> & {
  data: LikeType[]
}

export type ActionLikeReponse = {
  message: string
  status: 0 | 1
}
