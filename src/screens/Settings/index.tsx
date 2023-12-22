import { Button, Text, View } from 'react-native'
import React, { FC } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'

const Settings: FC<ScreenProps> = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'red' }}>
      <Text>Settings</Text>
      <Button
        title="go Home"
        onPress={() => {
          NavigationService.navigate(Route.Home)
        }}
      />
    </View>
  )
}

export default Settings
