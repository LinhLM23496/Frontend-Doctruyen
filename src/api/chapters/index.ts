import client from 'api/client'
import { GetListChapterParams, GetListChapterReponse } from './types'

export const getListChapter = async (
  params: GetListChapterParams
): Promise<GetListChapterReponse> => await client.get('/chapters', { params })
