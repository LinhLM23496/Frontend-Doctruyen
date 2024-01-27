import { authsAPI } from 'api'
import { LoginData } from 'api/auths/types'
import { useState } from 'react'
import { useNotifycation, useTokenStore, useUsersStore } from 'stores'
import { DefaultProps } from './types'
import { ToastAndroid } from 'react-native'

const PropsDefault = {
  onError: () => {},
  onLoading: () => {},
  onSuccess: () => {}
}

export const useLogin = (props?: DefaultProps) => {
  const { onError, onLoading, onSuccess } = props ?? PropsDefault
  const { setToken } = useTokenStore()
  const { setUser } = useUsersStore()
  const { setNotifycation } = useNotifycation()
  const [isLoading, setIsLoading] = useState(false)

  const onLogin = async (params: LoginData) => {
    try {
      setIsLoading(true)
      onLoading?.(true)

      const { token, userInfo, message } = await authsAPI.login(params)

      setToken(token)
      setUser(userInfo)
      setNotifycation({
        display: true,
        content: message,
        type: 'success',
        position: 'top'
      })
      // ToastAndroid.show(message, ToastAndroid.LONG)

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
