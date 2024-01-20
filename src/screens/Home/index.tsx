import { ScrollView, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { ScreenProps } from 'navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import { HEIGHT_BOTTOM_BAR, space } from 'themes'
import Suggestion from './components/Suggestion'
import { Text } from 'components'
import History from './components/History'
import { unitId } from 'lib'

const Home: FC<ScreenProps> = () => {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <ScrollView
      style={[styles.container, { paddingTop: top }]}
      contentContainerStyle={{ paddingBottom: bottom + HEIGHT_BOTTOM_BAR }}>
      <GAMBannerAd
        unitId={unitId.BANNER}
        sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
      <Text size="xl" fontWeight="500" style={styles.title}>
        Đọc truyện cùng tôi nhé!
      </Text>
      <Suggestion />
      <History style={styles.history} />
      <GAMBannerAd
        unitId={unitId.BANNER}
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
