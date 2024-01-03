import client from 'api/client'
import {
  GetChapterReposne,
  GetListChapterParams,
  GetListChapterReponse
} from './types'

export const getListChapter = async (
  params: GetListChapterParams
): Promise<GetListChapterReponse> => await client.get('/chapters', { params })

export const getChapter = async (params: {
  chapterId: string
}): Promise<GetChapterReposne> => await client.get('chapter', { params })
