import messaging, {
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging'
import { Permission, parseRoute } from 'lib'
import { STORAGE_KEY, setStorage, useNotifStore } from 'stores'
import notifee, {
  AndroidImportance,
  Event,
  EventType,
  Notification
} from '@notifee/react-native'

export const initialize = async () => {
  notifee.getInitialNotification()
  await Badge.get()
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
  remoteMessage: FirebaseMessagingTypes.RemoteMessage | Notification | undefined
) => {
  const Route = remoteMessage?.data?.Route as string
  const Param = remoteMessage?.data?.Param as any
  const messageId =
    (remoteMessage as FirebaseMessagingTypes.RemoteMessage)?.messageId ??
    (remoteMessage as Notification)?.id ??
    ''

  if (Route && Param && messageId) {
    // Read notification when click notifee or firebase message
    useNotifStore.getState().readNotif(undefined, messageId)
    Badge.decrement()

    parseRoute(Route, Param)
  }
}

/**
 // TODO: App Background && App killed
 * Action: Badge increment
 */
export const onBackgroundMessageHandler = () => {
  return messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    if (remoteMessage && remoteMessage?.messageId) {
      useNotifStore.getState().addNotif(remoteMessage)
    }
    Badge.increment()
  })
}

/**
// TODO: App Background
* Action: show notification (firebase)
* Action: add notification to useNotifStore
* PressAction:open App && Badge decrement && Route
*/
export const onNotificationOpenedApp = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    // Press Message Firebase is add notification to useNotifStore
    useNotifStore.getState().addNotif(remoteMessage)
    if (remoteMessage) onRoute(remoteMessage)
  })
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
* Action: add notification to useNotifStore
* PressAction: Route
*/

export const onForegroundListener = messaging().onMessage((remoteData) => {
  // nofifee show notification is add notification to useNotifStore
  useNotifStore.getState().addNotif(remoteData)
  // nofifee show notification
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

  const handleConfig = {
    ...remoteData?.notification,
    id: remoteData?.messageId,
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
    case EventType.DELIVERED:
      Badge.increment()
      break
    case EventType.PRESS:
      onRoute(event?.detail?.notification)
      break
    default:
      break
  }
}

export const onForegroundEvent = notifee.onForegroundEvent((event: Event) => {
  return handleNotificationEvent(event)
})

export const onBackgroundEvent = notifee.onBackgroundEvent(
  async ({ type, detail }) => {
    if (type === EventType.PRESS) {
      onRoute(detail?.notification)
    }
  }
)

export const readNotification = async (messageId: string) => {
  Badge.decrement()
  await notifee.cancelNotification(messageId)
}

export const readAllNotification = async () => {
  Badge.clear()
  await notifee.cancelAllNotifications()
}

export const clearNotification = async () => {
  await notifee.cancelAllNotifications()
}
