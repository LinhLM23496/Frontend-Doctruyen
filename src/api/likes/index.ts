import client from 'api/client'
import { ParamsPageType } from 'api/types'
import { ActionLikeReponse, ListLikeReponse } from './types'

export const getListLike = (params: ParamsPageType): Promise<ListLikeReponse> =>
  client.get('/likes', { params })

export const like = (bookId: string): Promise<ActionLikeReponse> =>
  client.post(`/likes/${bookId}`)
