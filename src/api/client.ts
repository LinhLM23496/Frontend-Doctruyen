import axios, { AxiosResponse } from 'axios'
import { STORAGE_KEY, getStorage } from 'stores'

export type ListParams = {
  Page?: number
  Limit?: number
  Oder?: string
  Odir?: string
}

const client = axios.create({
  // baseURL: 'http://192.168.0.128:1402/api',
  baseURL: 'https://lmlgroup.io.vn/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const logStyle =
  'color: black; font-weight: bold; font-size:12px; background-color: #FF4242;color: #FFFFFF; padding: 4px; border-radius: 2px'

const successStyle =
  'color: black; font-weight: bold; font-size:12px; background-color: #fff;color: #000; padding: 4px; border-radius: 2px'

client.interceptors.request.use(async (config: any) => {
  const { token } = getStorage(STORAGE_KEY.TOKEN)
  const accessToken = token?.accessToken || ''

  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken
  }
  if (config?.customUrl) {
    config.baseURL = config.customUrl
  }
  if (config?.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }

  return config
})

// * 401: Hết hạn
// * 403: Invalid Token

client.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response

    if ([200, 201].includes(status)) {
      if (__DEV__) {
        console.log(
          `%c[API] [${response.config.method}] [${response.config.url}]\n`,
          successStyle,
          data.data
        )
      }

      if (data?.paging) {
        return data
      }

      return data.data
      // throw value || data;
    }
    throw response
  },
  (error) => {
    const {
      config,
      response: { status, data }
    } = error

    if (__DEV__) {
      console.log(
        `%c Lỗi nè - [${config?.url}] - [${status}]\n`,
        logStyle,
        data
      )
    }

    throw data
  }
)

export default client
