import client from 'api/client'

export const getWhiteList = (): Promise<any> => client.get('/white-list')
