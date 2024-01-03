import { ScrollView, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { ScreenProps } from 'navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { color, space } from 'themes'
import Suggestion from './components/Suggestion'
import { Text } from 'components'

const Home: FC<ScreenProps> = () => {
  const { top } = useSafeAreaInsets()

  return (
    <ScrollView style={[styles.container, { paddingTop: top }]}>
      <Text size="xl" fontWeight="500" style={styles.title}>
        Đọc truyện cùng tôi nhé!
      </Text>
      <Suggestion />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark
  },
  title: {
    paddingHorizontal: space.m
  }
})
