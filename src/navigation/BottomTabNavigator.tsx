import React from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import Route from './Route'
import { TabBar } from 'components'

const { Navigator, Screen } = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home'

const BottomTabNavigator = () => {
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
      <Screen {...Route.Profile} />
    </Navigator>
  )
}

export default BottomTabNavigator
