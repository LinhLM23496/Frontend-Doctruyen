import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color, space } from 'themes'
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'

type Props = {
  time?: number
  size?: number
  onDone?: () => void
  color?: string
  colorBackground?: string
  style?: StyleProp<ViewStyle>
}

const ProgressBar = (props: Props) => {
  const {
    time = 4,
    size = 1,
    onDone,
    color: colorProgress = color.danger,
    colorBackground = undefined,
    style
  } = props
  const [second, setSecond] = useState(time)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      setSecond((value) => value - 1)
    }, 1000)

    setIntervalId(newIntervalId)
    return () => {
      clearInterval(newIntervalId)
    }
  }, [])

  useEffect(() => {
    if (second < 0) {
      clearInterval(intervalId)
      setSecond(0)
      typeof onDone === 'function' && onDone()
    }
  }, [second])

  const transitionStyle = useAnimatedStyle(() => {
    const percent = second >= time ? 100 : (second / time) * 100
    return {
      width: withTiming(`${percent}%`, {
        duration: 1000,
        easing: Easing.linear
      })
    }
  }, [second])

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.background,
          { height: size, marginBottom: size, backgroundColor: colorBackground }
        ]}>
        <Animated.View
          style={[
            styles.progress,
            transitionStyle,
            { backgroundColor: colorProgress }
          ]}
        />
      </View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  background: {
    flex: 1,
    borderRadius: space.xl,
    overflow: 'hidden'
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0
  }
})
