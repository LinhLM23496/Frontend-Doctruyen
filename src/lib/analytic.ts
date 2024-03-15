import analytics from '@react-native-firebase/analytics'
import { NavigationService } from 'navigation'
import { STORAGE_KEY, Storage } from 'stores'

export const EVENT_NAME = {
  book_detail: 'book_detail',
  read_chapter: 'read_chapter'
}

type Params = {
  [key: string]: any
  EventAction?: string
  EventValue?: any
}

export const logEvent = async (
  event: string | Function,
  params: Params = {}
): Promise<void> => {
  const jsonData = Storage.getItem(STORAGE_KEY.USER) as any
  const dataParse = JSON.parse(jsonData)
  const { displayName, _id } = dataParse?.state?.user ?? {}

  if (_id) analytics().setUserId(_id)
  if (displayName) analytics().setUserProperty('displayName', displayName)

  if (typeof event === 'function') await event?.()
  else {
    await analytics().logEvent(event, params)
  }
}

export const logScreen = async () => {
  const screen = NavigationService.getRoute()
  const screen_name = screen ? screen?.name : ''

  if (screen_name) {
    logEvent(
      async () =>
        await analytics().logScreenView({
          screen_class: screen_name,
          screen_name
        })
    )
  }
}
