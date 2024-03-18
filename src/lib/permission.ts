import { PermissionsAndroid } from 'react-native'

export const requestNotification = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Xin quyền thông báo nè <3',
        message: 'Cho mình gửi thông báo nhé!',
        buttonNegative: 'Hoy, không cho!',
        buttonPositive: 'OK, Cho tất!'
      }
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}
