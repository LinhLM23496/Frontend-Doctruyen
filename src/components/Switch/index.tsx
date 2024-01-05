import { Pressable, StyleSheet, useColorScheme } from 'react-native'
import React, { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { color, colorRange, space } from 'themes'
import { ThemeType } from 'stores/themes/types'
import Text from 'components/Text'
import { useThemeStore } from 'stores'

const THEME = {
  system: 'system',
  light: 'light',
  dark: 'dark'
}

const Switch = () => {
  const colorScheme = useColorScheme()
  const { theme, setTheme, themeSwitch, setThemeSwitch } = useThemeStore()
  const translateX = useSharedValue(0)
  const SWITCH_CONTAINER_WIDTH = space.width * 0.8
  const SWITCH_WIDTH = SWITCH_CONTAINER_WIDTH / 3
  const WIDTH_SLIDE = (space.width * 0.7) / 3

  useEffect(() => {
    if (themeSwitch === THEME.system && colorScheme) {
      setTheme(colorScheme)
    }
  }, [colorScheme, setTheme, themeSwitch])

  useEffect(() => {
    if (themeSwitch === THEME.system) {
      translateX.value = withSpring(SWITCH_WIDTH * 0)
    } else if (themeSwitch === THEME.light) {
      translateX.value = withSpring(SWITCH_WIDTH * 1)
    } else if (themeSwitch === THEME.dark) {
      translateX.value = withSpring(SWITCH_WIDTH * 2)
    }
  }, [SWITCH_WIDTH, themeSwitch, translateX])

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    }
  })

  const backgroundColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === THEME.dark
          ? withTiming(color.black)
          : withTiming(colorRange.gray[100])
    }
  })

  const textColorAnimation = useAnimatedStyle(() => {
    return {
      color:
        theme === THEME.dark ? withTiming(color.white) : withTiming(color.black)
    }
  })

  const backgroundColorSlideAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === THEME.dark
          ? withTiming(colorRange.gray[700])
          : withTiming(color.white)
    }
  })

  const handleSystem = () => {
    setThemeSwitch('system')
    if (colorScheme) {
      setTheme(colorScheme)
    }
  }

  const handle = (value: ThemeType) => {
    setThemeSwitch(value)
    setTheme(value)
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { width: SWITCH_CONTAINER_WIDTH },
        backgroundColorAnimation
      ]}>
      <Animated.View
        style={[
          styles.slideContainer,
          { width: SWITCH_WIDTH },
          translateAnimation
        ]}>
        <Animated.View
          style={[
            styles.slide,
            { width: WIDTH_SLIDE },
            backgroundColorSlideAnimation
          ]}
        />
      </Animated.View>
      <Pressable style={styles.button} onPress={handleSystem}>
        <Text
          Element={Animated.Text}
          fontWeight="500"
          style={textColorAnimation}>
          System
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => handle('light')}>
        <Text
          Element={Animated.Text}
          fontWeight="500"
          style={textColorAnimation}>
          Light
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => handle('dark')}>
        <Text
          Element={Animated.Text}
          fontWeight="500"
          style={textColorAnimation}>
          Dark
        </Text>
      </Pressable>
    </Animated.View>
  )
}

export default Switch

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: space.m
  },
  slideContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slide: {
    padding: space.l,
    borderRadius: 100
  }
})
