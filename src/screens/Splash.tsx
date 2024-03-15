import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationService, Route } from 'navigation'
import { useUsersStore, useWhiteList } from 'stores'
import LottieView from 'lottie-react-native'
import { images, lotties } from 'assets'
import { avatarSize, space } from 'themes'
import { whiteListAPI } from 'api'
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

const Splash = () => {
  const defaultAnim = useSharedValue(-space.width)
  const { setWhiteList } = useWhiteList()
  const { myUserId, refetch } = useUsersStore()

  const animatedLogo = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value }]
  }))

  useEffect(() => {
    const fetchWhiteList = async () => {
      try {
        const [whiteListResponse] = await Promise.all([
          whiteListAPI.getWhiteList(),
          myUserId && myUserId?.length && refetch(myUserId)
        ])

        setWhiteList(whiteListResponse)
      } finally {
        NavigationService.replace(Route.Main)
      }
    }

    defaultAnim.value = withTiming(0, {
      duration: 1000,
      easing: Easing.elastic(2),
      reduceMotion: ReduceMotion.System
    })

    fetchWhiteList()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.Image
        source={images.logo}
        style={[styles.logo, animatedLogo]}
      />
      <LottieView
        source={lotties.loading}
        style={styles.lottie}
        autoPlay
        loop
      />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: avatarSize.xl,
    aspectRatio: 1,
    borderRadius: avatarSize.xl
  },
  lottie: {
    width: '100%',
    height: avatarSize.xxl
  }
})
