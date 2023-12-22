import axios, { AxiosResponse } from 'axios'

export type ListParams = {
  Page?: number
  Limit?: number
  Oder?: string
  Odir?: string
}

const client = axios.create({
  baseURL: 'http://192.168.1.5:1402/api',
  headers: {
    'content-type': 'application/json'
  }
})

const logStyle =
  'color: black; font-weight: bold; font-size:12px; background-color: #FF4242;color: #FFFFFF; padding: 4px; border-radius: 2px'

const successStyle =
  'color: black; font-weight: bold; font-size:12px; background-color: #fff;color: #000; padding: 4px; border-radius: 2px'

client.interceptors.request.use(async (config: any) => {
  const accessToken = ''
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

    if (status === 200) {
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

    const errorData = data.error

    if (__DEV__) {
      console.log(
        `%c Lỗi nè - [${config?.url}] - [${status}]\n`,
        logStyle,
        errorData
      )
    }

    throw errorData
  }
)

export default client
