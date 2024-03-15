import React, { useEffect } from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import Route from './Route'
import { TabBar } from 'components'
import { Notification } from 'lib'

const { Navigator, Screen } = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home'

Notification.onBackgroundMessageHandler()

const BottomTabNavigator = () => {
  useEffect(() => {
    Notification.initialize()
    Notification.onNotificationOpenedApp()
    Notification.openNotificationWhenClosed()

    return () => {
      Notification.onForegroundListener()
      Notification.onBackgroundEvent
      Notification.onForegroundEvent()
    }
  }, [])

  return (
    <Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        tabBarHideOnKeyboard: true
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      <Screen {...Route.Home} />
      <Screen {...Route.ListBook} />
      <Screen {...Route.Profile} />
    </Navigator>
  )
}

export default BottomTabNavigator
