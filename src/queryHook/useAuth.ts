import { authsAPI } from 'api'
import { LoginData } from 'api/auths/types'
import { useState } from 'react'
import { useTokenStore, useUsersStore } from 'stores'
import { DefaultProps } from './types'
import { ToastAndroid } from 'react-native'

const PropsDefault = {
  onError: () => {},
  onLoading: () => {},
  onSuccess: () => {}
}

export const useLogin = (props?: DefaultProps) => {
  const { onError, onLoading, onSuccess } = props ?? PropsDefault
  const { setData: setToken } = useTokenStore()
  const { setData } = useUsersStore()
  const [isLoading, setIsLoading] = useState(false)

  const onLogin = async (params: LoginData) => {
    try {
      setIsLoading(true)
      onLoading?.(true)

      const { token, userInfo } = await authsAPI.login(params)

      setToken(token)
      setData(userInfo)
      ToastAndroid.show('Bạn đã đăng nhập thành công !', ToastAndroid.SHORT)

      onSuccess?.(userInfo)
    } catch (error: any) {
      onError?.(error)
      ToastAndroid.show(error?.message, ToastAndroid.SHORT)
    } finally {
      setIsLoading(false)
      onLoading?.(false)
    }
  }

  return { isLoading, onLogin }
}
