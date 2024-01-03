import {
  Button,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import { Icon, NavigationBar, Text } from 'components'
import { color, fontSize, space } from 'themes'
import Header from './components/Header'
import { useChapterDetailStore } from 'stores/chapters'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { ActivityIndicator } from 'react-native'

const Chapter: FC<ScreenProps<'Chapter'>> = ({ route }) => {
  const { chapterId: id } = route?.params
  const { data, isLoading, getData } = useChapterDetailStore()
  const { content, numberChapter, bookId, previousId, nextId } = data ?? {}
  const [chapterId, setChapterId] = useState(id)

  const heightAnimated = useSharedValue(0)
  const velocityAnimated = useSharedValue(0)

  useEffect(() => {
    const fetchData = async () => {
      if (!chapterId) return
      await getData(chapterId)
    }
    fetchData()
  }, [chapterId, getData])

  const handleRead = (newChapterId: string) => {
    setChapterId(newChapterId)
  }

  const onPressTitle = () => {
    NavigationService.resetMain(Route.BookDetail, { bookId })
  }

  const styleAnimatedNavBar = useAnimatedStyle(() => {
    const translateY = interpolate(velocityAnimated.value, [0, 1], [0, -110], {
      extrapolateRight: Extrapolation.CLAMP
    })

    return { transform: [{ translateY: withTiming(translateY) }] }
  })

  const styleAnimatedTitle = useAnimatedStyle(() => {
    const opacity = interpolate(heightAnimated.value, [0, 110], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP
    })

    return { opacity }
  })

  const styleAnimatedBottom = useAnimatedStyle(() => {
    const translateY = interpolate(velocityAnimated.value, [1, 0], [80, 0], {
      extrapolateRight: Extrapolation.CLAMP
    })

    return { transform: [{ translateY: withTiming(translateY) }] }
  })

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y
    const velocityY = e.nativeEvent.velocity?.y
    const sizeHeight = e.nativeEvent.contentSize.height

    heightAnimated.value = offsetY
    velocityAnimated.value = velocityY ?? 0

    if (
      offsetY <= 50 ||
      offsetY >= sizeHeight - 950 ||
      (!!velocityY && velocityY < 0) ||
      !velocityY
    ) {
      velocityAnimated.value = 0
    } else {
      velocityAnimated.value = 1
    }
  }

  const renderTitle = () => (
    <Animated.Text
      numberOfLines={1}
      onPress={onPressTitle}
      style={[styles.title, styleAnimatedTitle]}>
      {data?.title}
    </Animated.Text>
  )

  if (!data || isLoading) {
    return (
      <View style={styles.center}>
        <NavigationBar absolute />
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.flex1}>
      <Animated.View style={[styles.navBar, styleAnimatedNavBar]}>
        <NavigationBar
          title={renderTitle}
          backgroundColor={color.dark}
          titleStyle={styleAnimatedTitle}
        />
      </Animated.View>
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.list}>
        <Header data={data} onPressTitle={onPressTitle} />
        <Text size="l" style={styles.content}>
          {content}
        </Text>
      </ScrollView>
      <Animated.View style={[styles.bottomAction, styleAnimatedBottom]}>
        {previousId ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleRead(previousId)}
            style={styles.button}>
            <Icon name={'previous'} />
          </TouchableOpacity>
        ) : (
          <View style={styles.flex1} />
        )}
        <Button title={`Chương ${numberChapter}`} />
        {nextId ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleRead(nextId)}
            style={styles.button}>
            <Icon name={'next'} />
          </TouchableOpacity>
        ) : (
          <View style={styles.flex1} />
        )}
      </Animated.View>
    </View>
  )
}

export default Chapter

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  title: {
    fontSize: fontSize.l,
    fontWeight: 'bold',
    textAlign: 'center',
    color: color.black
  },
  list: {
    paddingHorizontal: space.m,
    paddingBottom: 80,
    paddingTop: 110
  },
  content: {
    marginTop: space.m
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    marginHorizontal: space.xl,
    marginBottom: space.m,
    justifyContent: 'center',
    gap: space.m
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.blue,
    borderRadius: space.xxs
  }
})
