import { ResponsePagingType } from 'api/types'

export type NotificationType = {
  _id: string
  messageId: string
  user: string
  title: string
  body: string
  data: {
    Route: string
    Param: {
      [key: string]: any
    }
  }
  createdBy: string
  isRead: boolean
  updatedAt: Date
  createdAt: Date
}

export type ListNotifReponse = Omit<ResponsePagingType, 'data'> & {
  data: NotificationType[]
}
