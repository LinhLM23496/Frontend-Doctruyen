import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { Main } from 'navigation'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

enableScreens(false)

function App(): JSX.Element {
  return (
    <Provider>
      <Main />
    </Provider>
  )
}

export default App

type ProviderType = {
  children: JSX.Element
}

function Provider({ children }: ProviderType): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <StatusBar translucent backgroundColor="transparent" />
          {children}
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 }
})
