import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationService, Route } from 'navigation'
import { useUsersStore, useWhiteList } from 'stores'
import LottieView from 'lottie-react-native'
import { lotties } from 'assets'
import { avatarSize } from 'themes'
import { whiteListAPI } from 'api'

const Splash = () => {
  const { setWhiteList } = useWhiteList()
  const { user, refetch } = useUsersStore()

  useEffect(() => {
    const fetchWhiteList = async () => {
      try {
        const [whiteListResponse] = await Promise.all([
          whiteListAPI.getWhiteList(),
          user?._id && user?._id?.length && refetch(user?._id)
        ])

        setWhiteList(whiteListResponse)
      } finally {
        NavigationService.replace(Route.Main)
      }
    }

    fetchWhiteList()
  }, [])

  return (
    <View style={styles.container}>
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
  lottie: {
    width: '100%',
    height: avatarSize.xxl
  }
})
