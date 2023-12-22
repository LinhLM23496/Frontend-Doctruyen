import client from 'api/client'

export const getSuggestions = async (): Promise<any[]> =>
  await client.get('/suggestion')
