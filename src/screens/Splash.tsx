import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationService, Route } from 'navigation'

const Splash = () => {
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        NavigationService.replace(Route.Main)
      }, 1)
    }

    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <Text>...Loading</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
