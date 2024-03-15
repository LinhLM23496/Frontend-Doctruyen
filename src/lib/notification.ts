import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging'
import { Permission, parseRoute } from 'lib'
import { STORAGE_KEY, setStorage } from 'stores'
import notifee, {
  AndroidImportance,
  Event,
  EventType
} from '@notifee/react-native'

export const initialize = () => {
  notifee.getInitialNotification()
}

export const getFCMToken = async () => {
  const authorizationStatus = await messaging().requestPermission()
  await Permission.requestNotification()

  if (authorizationStatus) {
    const fcmToken = await messaging().getToken()
    setStorage(STORAGE_KEY.FCM_TOKEN, fcmToken)
    return fcmToken
  }
}

const Badge = {
  set: (value: number) => {
    notifee.setBadgeCount(value)
  },
  increment: (value = 1) => {
    notifee.incrementBadgeCount(value)
  },
  decrement: (value = 1) => {
    notifee.decrementBadgeCount(value)
  },
  get: async () => {
    try {
      const count: Number = await notifee.getBadgeCount()
      return count
    } catch (e) {
      return 0
    }
  },
  clear: () => {
    Badge.set(0)
  }
}

const onRoute = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage | null
) => {
  const Route = remoteMessage?.data?.Route as string
  const Param = remoteMessage?.data?.Param

  if (Route && Param) {
    Badge.decrement()
    parseRoute(Route, Param)
  }
}

/**
 // TODO: App Background && App killed
 * Action: Badge increment
 */
export const onBackgroundMessageHandler = () => {
  return messaging().setBackgroundMessageHandler(async () => {
    Badge.increment()
  })
}

/**
// TODO: App Background
* Action: show notification (firebase)
* PressAction:open App && Badge decrement && Route
*/
export const onNotificationOpenedApp = () => {
  messaging().onNotificationOpenedApp(onRoute)
}

/**
// TODO: App killed
* Action: show notification (firebase)
* PressAction:open App && Badge decrement && Route
*/
export const openNotificationWhenClosed = () => {
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) onRoute(remoteMessage)
    })
}

/**
// TODO: App active
* Action: show notification (notifee)
* PressAction: Route
*/

export const onForegroundListener = messaging().onMessage((remoteData) => {
  onDisplayNotification(remoteData)
})

const onDisplayNotification = async (
  remoteData: FirebaseMessagingTypes.RemoteMessage
) => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Đọc truyện Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default'
  })

  console.log('onDisplayNotification remoteData', remoteData)

  const handleConfig = {
    ...remoteData?.notification,
    data: remoteData?.data,
    android: {
      channelId,
      circularLargeIcon: true,
      largeIcon: 'https://s3.tebi.io/doctruyen/small-logo.png',
      smallIcon: 'ic_launcher_round',
      pressAction: {
        id: 'default'
      }
    },
    ios: {}
  }

  /**
   * !FIXME: Chỗ này app đang active và dùng notifee để hiện thị Notification
   * Action: Badge increment and show notification
   */

  Badge.increment()

  // Display a notification
  await notifee.displayNotification(handleConfig)
}

const handleNotificationEvent = (event: Event): void => {
  switch (event?.type) {
    case EventType.DELIVERED: {
      Badge.increment()
      break
    }
    case EventType.PRESS: {
      const data = event?.detail?.notification?.data

      const Route = data?.Route as string
      const Param = data?.Param

      if (Route && Param) {
        Badge.decrement()
        parseRoute(Route, Param)
      }
      break
    }
  }
}

export const onForegroundEvent = notifee.onForegroundEvent((event: Event) =>
  handleNotificationEvent(event)
)

export const onBackgroundEvent = notifee.onBackgroundEvent(
  async ({ type, detail }) => {
    const { notification } = detail

    if (type === EventType.PRESS) {
      const Route = notification?.data?.Route as string
      const Param = notification?.data?.Param
      if (Route && Param) {
        Badge.decrement()
        parseRoute(Route, Param)
      }
    }
  }
)
