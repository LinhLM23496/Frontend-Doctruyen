import { ScrollView, StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import { ScreenProps } from 'navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import { HEIGHT_BOTTOM_BAR, space } from 'themes'
import { Text } from 'components'
import History from './components/History'
import Suggestion from './components/Suggestion'
import Carousel from './components/Carousel'
import NewUpdate from './components/NewUpdate'
import { Admob, Notification } from 'lib'
import { STORAGE_KEY, getStorage, setStorage } from 'stores'

const Home: FC<ScreenProps> = () => {
  const { top, bottom } = useSafeAreaInsets()
  const oldUser = getStorage(STORAGE_KEY.OLD_USER)

  useEffect(() => {
    if (!oldUser) {
      Notification.getFCMToken()
      setStorage(STORAGE_KEY.OLD_USER, true)
    }
  }, [])

  return (
    <ScrollView
      style={[styles.container, { paddingTop: top }]}
      contentContainerStyle={{ paddingBottom: bottom + HEIGHT_BOTTOM_BAR }}>
      <Carousel />
      <Text size="xl" fontWeight="500" style={styles.title}>
        Đọc truyện cùng tôi nhé!
      </Text>
      <Suggestion />
      <NewUpdate />
      <History style={styles.history} />
      <GAMBannerAd
        unitId={Admob.unitId.BANNER}
        sizes={[BannerAdSize.INLINE_ADAPTIVE_BANNER]}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    paddingHorizontal: space.m
  },
  history: {
    marginBottom: space.m
  }
})
