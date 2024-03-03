import client from 'api/client'
import {
  GetChapterReposne,
  GetListChapterParams,
  GetListChapterReponse,
  ListNewUpdateParams,
  ListNewUpdateReponse
} from './types'

export const getListChapter = async (
  params: GetListChapterParams
): Promise<GetListChapterReponse> => await client.get('/chapters', { params })

export const getChapter = async (params: {
  chapterId: string
}): Promise<GetChapterReposne> => await client.get('/chapter', { params })

export const getListNewUpdate = async (
  params: ListNewUpdateParams
): Promise<ListNewUpdateReponse> =>
  await client.get('/chapters/last-update', { params })
