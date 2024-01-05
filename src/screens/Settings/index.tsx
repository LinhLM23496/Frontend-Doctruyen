import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { ScreenProps } from 'navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SettingsFast, Text } from 'components'
import { space } from 'themes'

const Settings: FC<ScreenProps> = () => {
  const { top } = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: top }} size="xl" textAlign="center">
        Cài đặt
      </Text>
      <SettingsFast />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: space.m
  }
})
