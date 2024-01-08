import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import {
  BottomSheet,
  Icon,
  List,
  NavigationBar,
  SettingsFast,
  Text
} from 'components'
import { color, fontSize, space } from 'themes'
import Header from './components/Header'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { ActivityIndicator } from 'react-native'
import {
  useChapterDetailStore,
  useChapterStore,
  useHistoryStore,
  useRatioStore
} from 'stores'
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet'
import { ChapterShort } from 'api/chapters/types'
import FooterChapters from 'screens/BookDetail/components/FooterChapters'

const Chapter: FC<ScreenProps<'Chapter'>> = ({ route }) => {
  const { chapterId: id } = route?.params
  const { ratio } = useRatioStore()
  const { data, isLoading, getData } = useChapterDetailStore()
  const { data: chapters, isLoading: loadingChapters } = useChapterStore()
  const { addHistory } = useHistoryStore()

  const { title, content, numberChapter, previousId, nextId, bookId } =
    data ?? {}
  const [loading, setLoading] = useState(true)
  const [chapterId, setChapterId] = useState(id)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['80%'], [])
  const settingsFastRef = useRef<BottomSheetModal>(null)

  const heightAnimated = useSharedValue(0)
  const velocityAnimated = useSharedValue(0)

  useEffect(() => {
    const fetchData = async () => {
      if (!chapterId) return

      setLoading(true)

      const res = await getData(chapterId)

      if (res) {
        const history = {
          bookId: res.bookId,
          chapterId,
          nameChapter: res.title,
          numberChapter: res.numberChapter
        }
        addHistory(history)
      }

      setLoading(false)
    }

    fetchData()
  }, [chapterId])

  const handleRead = (newChapterId: string) => {
    setChapterId(newChapterId)
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

  const handleSettings = () => {
    settingsFastRef.current?.present()
  }

  const handleClose = () => {
    settingsFastRef.current?.close()
  }

  const handleTitle = () => {
    NavigationService.resetMain(Route.BookDetail, { bookId })
  }

  const renderTitle = () => (
    <TouchableOpacity activeOpacity={0.8} onPress={handleTitle}>
      <Text
        Element={Animated.Text}
        numberOfLines={1}
        style={[styles.title, styleAnimatedTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  )

  const renderItem = ({ item }: { item: ChapterShort }) => {
    const handleChapter = () => {
      setChapterId(item._id)
      bottomSheetRef.current?.close()
    }

    return (
      <TouchableOpacity
        onPress={handleChapter}
        disabled={loadingChapters}
        style={styles.bottomSheetItem}>
        <Text type="content">{item.title}</Text>
      </TouchableOpacity>
    )
  }

  if (!data || isLoading || loadingChapters || loading) {
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
          ElementRight={
            <TouchableOpacity
              style={styles.settingButton}
              activeOpacity={0.8}
              onPress={handleSettings}>
              <Icon name={'setting-2'} size="xl" />
            </TouchableOpacity>
          }
        />
      </Animated.View>
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={100}
        contentContainerStyle={styles.list}>
        <Header data={data} />
        <Text size="l" type="content" ratio={ratio} style={styles.content}>
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

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => bottomSheetRef.current?.present()}
          style={styles.button}>
          <Text type="subTitle">{`Chương ${numberChapter}`}</Text>
        </TouchableOpacity>

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
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        {!loadingChapters ? (
          <List
            Element={BottomSheetFlatList}
            data={chapters}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listChapter}
          />
        ) : (
          <ActivityIndicator size="large" style={styles.center} />
        )}
        <FooterChapters bookId={data.bookId} />
      </BottomSheet>
      <BottomSheet
        ref={settingsFastRef}
        enableDynamicSizing
        enableContentPanningGesture={false}>
        <BottomSheetView style={styles.settingsFast}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleClose}
            style={styles.close}>
            <Icon name="close-circle" size="l" />
          </TouchableOpacity>
          <Text size="xl" type="title" style={styles.titleSettings}>
            Cài đặt
          </Text>
          <SettingsFast />
        </BottomSheetView>
      </BottomSheet>
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
    borderRadius: space.xxs,
    paddingVertical: space.xxs
  },
  listChapter: {
    gap: space.s,
    marginTop: space.m,
    paddingBottom: 100 // for FooterChapters
  },
  bottomSheetItem: {
    paddingHorizontal: space.m
  },
  settingsFast: {
    paddingHorizontal: space.m,
    paddingBottom: space.m
  },
  titleSettings: {
    marginBottom: space.m
  },
  close: {
    position: 'absolute',
    right: space.xxs,
    top: -space.s,
    padding: space.s,
    zIndex: 1
  },
  settingButton: {
    width: '100%',
    alignItems: 'flex-end'
  }
})
