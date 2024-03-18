import client from 'api/client'
import { ParamsPageType } from 'api/types'
import { ListNotifReponse } from './types'

export const getListNotification = (
  params: ParamsPageType
): Promise<ListNotifReponse> => client.get('/notifications', { params })

export const countUnreadNotification = (): Promise<number> =>
  client.get('/notifications/count-unread')

export const readNotification = (id: string): Promise<void> =>
  client.put(`/notification/${id}/read`)

export const readNotifByMessageId = (data: {
  messageId: string
}): Promise<void> => {
  // xử lý message id có dấu %
  return client.put('/notification/message-read', data)
}

export const readAllNotification = (): Promise<void> =>
  client.put('/notifications/read-all')
