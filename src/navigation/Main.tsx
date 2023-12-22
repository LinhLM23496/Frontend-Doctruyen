import React from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigationService, { RootStackParamList } from './NavigationService'
import Route from './Route'
import BottomTabNavigator from './BottomTabNavigator'

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

const Main = () => {
  const initialRouteName = 'Main'
  return (
    <NavigationContainer ref={NavigationService.navigationRef} theme={DarkTheme}>
      <Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}>
        <Screen name={Route.Main.name} component={BottomTabNavigator} />
        <Screen {...Route.Home} />
        <Screen {...Route.Settings} />
      </Navigator>
    </NavigationContainer>
  )
}

export default Main
