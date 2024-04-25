import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React, { FC, useCallback, useRef, useState } from 'react'
import { Icon, NavigationBar, Row, Text } from 'components'
import { avatarSize, color, colorRandom, iconSize, space } from 'themes'
import { BookDetailType } from 'api/books/types'
import { useHeaderMeasurements } from 'react-native-collapsible-tab-view'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { likeAPI } from 'api'
import {
  useBookDetailStore,
  useBookStore,
  useLikeStore,
  useModal,
  useSuggestionStore,
  useUsersStore
} from 'stores'
import { LikeBookType } from 'api/likes/types'
import { lotties } from 'assets'
import LottieView from 'lottie-react-native'
import { NavigationService, Route } from 'navigation'

type Props = {
  data?: BookDetailType | null
  minHeaderHeight: number
  style?: ViewStyle
}

type ItemType = {
  item: string
  index: number
}

const Header: FC<Props> = ({ data, minHeaderHeight, style }) => {
  const {
    _id,
    categories,
    cover = '',
    banner,
    likes = 0,
    ownerLike = 0,
    name = '',
    views,
    chapters = 0,
    author,
    status = 0,
    updatedAt = new Date()
  } = data ?? {}
  const { top, height } = useHeaderMeasurements()
  const { myUserId } = useUsersStore()
  const { updateLike } = useLikeStore()
  const { updateLike: updateLikeBook } = useBookDetailStore()
  const { updateLike: updateLikeSuggestion } = useSuggestionStore()
  const { updateLike: updateLikeListBook } = useBookStore()
  const { setModal } = useModal()
  const [loadingLike, setLoadingLike] = useState(false)

  const lottieRef = useRef<LottieView>(null)
  const lottieRef2 = useRef<LottieView>(null)

  const styleAnimatedNavigationBar = useAnimatedStyle(() => {
    const heightHeader = (height.value || 0) - minHeaderHeight
    const opacity = interpolate(
      top.value,
      [-heightHeader / 2, -heightHeader],
      [0, 1],
      { extrapolateRight: Extrapolation.CLAMP }
    )

    const translateY = interpolate(
      top.value,
      [-heightHeader / 2, -heightHeader],
      [-heightHeader, 0],
      { extrapolateRight: Extrapolation.CLAMP }
    )

    return { opacity, transform: [{ translateY }] }
  })

  const styleAnimatedOpacity = useAnimatedStyle(() => {
    const heightHeader = (height.value || 0) - minHeaderHeight
    const opacity = interpolate(
      top.value,
      [-heightHeader / 2, -heightHeader],
      [1, 0],
      { extrapolateRight: Extrapolation.CLAMP }
    )

    return { opacity }
  })

  const styleAnimatedCover = useAnimatedStyle(() => {
    const heightHeader = (height.value || 0) - minHeaderHeight
    const range = [0, -heightHeader / 2]
    const scale = interpolate(top.value, range, [1, 1.4], {
      extrapolateRight: Extrapolation.CLAMP
    })

    const translateX = interpolate(top.value, range, [0, avatarSize.xxl / 2], {
      extrapolateRight: Extrapolation.CLAMP
    })

    return { transform: [{ scale }, { translateX }] }
  })

  const renderLike = useCallback(() => {
    return (
      <Row gap={space.xxs}>
        <View>
          <LottieView
            ref={lottieRef}
            source={lotties.like}
            style={styles.lottie}
            loop
          />
          <Icon name="heart" color={color.danger} />
        </View>
        <Text color={color.black}>{likes}</Text>
      </Row>
    )
  }, [ownerLike])

  if (!data) return

  const handleLike = async () => {
    if (!_id || loadingLike) return
    if (!myUserId) {
      setModal({
        display: true,
        content: 'Vui lòng đăng nhập để thích truyện',
        type: 'warning',
        position: 'top',
        button: [
          {
            content: 'Đăng nhập',
            onPress: () => NavigationService.navigate(Route.Login)
          }
        ]
      })
      return
    }

    try {
      setLoadingLike(true)
      if (!ownerLike) {
        lottieRef.current?.play()
        lottieRef2.current?.play()
      }
      const res = await likeAPI.like(_id)

      const bookLike: LikeBookType = {
        _id,
        name,
        cover,
        chapters,
        status,
        updatedAt
      }
      updateLikeBook(_id, res?.status)
      updateLikeSuggestion(_id, res?.status)
      updateLikeListBook(_id, res?.status)
      updateLike(bookLike, res?.status)

      setModal({
        display: true,
        content: res.message,
        type: 'success',
        position: 'top',
        autoClose: true,
        onClose: () => {
          lottieRef.current?.reset()
          lottieRef2.current?.reset()
        }
      })
    } catch (error: any) {
      setModal({
        display: true,
        content: error?.message,
        type: 'error',
        position: 'top'
      })
    } finally {
      setLoadingLike(false)
    }
  }

  const renderItem = ({ item, index: i }: ItemType) => {
    return (
      <View
        key={i}
        style={[styles.categories, { backgroundColor: colorRandom[i] }]}>
        <Text textAlign="center" fontWeight="500" size="s" color={color.black}>
          {item}
        </Text>
      </View>
    )
  }

  return (
    <LinearGradient colors={[color.dark, color.dark, color.white]}>
      <View style={[styles.container, style]}>
        <NavigationBar absolute />
        <Animated.View
          style={[styles.navigationBar, styleAnimatedNavigationBar]}>
          <NavigationBar
            title={name}
            subTitle={author}
            ElementRight={
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleLike}
                style={styles.iconNavigation}>
                <LottieView
                  ref={lottieRef2}
                  source={lotties.like}
                  style={styles.lottieLike2}
                  loop
                />
                <Icon name="heart" color={color.danger} size="xl" />
              </TouchableOpacity>
            }
            titleStyle={styles.navigationTitle}
            subTitleStyle={styles.navigationTitle}
          />
        </Animated.View>
        {banner ? (
          <Image source={{ uri: banner }} style={styles.banner} />
        ) : null}
        <Animated.View style={[styles.title, styleAnimatedOpacity]}>
          {cover ? (
            <Animated.Image
              source={{ uri: cover }}
              style={[styles.cover, styleAnimatedCover]}
            />
          ) : null}
          <View style={styles.titleSub}>
            <Text
              size="xl"
              fontWeight="bold"
              type="title"
              color={color.black}
              numberOfLines={3}>
              {name}
            </Text>
            <Text
              numberOfLines={2}
              fontWeight="500"
              type="subTitle"
              color={color.black}>
              Tác giả:{' '}
              <Text
                numberOfLines={2}
                fontWeight="bold"
                type="subTitle"
                color={color.black}>
                {author}
              </Text>
            </Text>
            <Text fontWeight="500" type="subTitle" color={color.black}>
              Trạng thái:{' '}
              <Text
                fontWeight="bold"
                color={status === 1 ? color.danger : color.primary}>
                {status === 1 ? 'Hoàn thành' : 'Đang cập nhật'}
              </Text>
            </Text>
            <View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
                data={categories}
                renderItem={renderItem}
              />
            </View>
            <TouchableOpacity
              disabled={loadingLike}
              activeOpacity={0.8}
              onPress={handleLike}
              style={styles.action}>
              {renderLike()}
              <Row gap={space.xxs}>
                <Icon name="eye" color={color.gray} />
                <Text color={color.black}>{views ?? 0}</Text>
              </Row>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: space.half_height,
    width: space.width
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: color.black
  },
  navigationTitle: {
    color: color.white
  },
  navigationSubTitle: {
    color: color.white
  },
  banner: {
    width: space.width,
    aspectRatio: 16 / 9
  },
  title: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    gap: space.s
  },
  cover: {
    width: avatarSize.xxl,
    aspectRatio: 3 / 4,
    borderRadius: space.m,
    marginLeft: space.m,
    zIndex: 1
  },
  titleSub: {
    flex: 1,
    alignSelf: 'flex-end',
    gap: space.xxs
  },
  categoryList: {
    gap: space.s,
    paddingRight: space.m
  },
  categories: {
    paddingHorizontal: space.xs,
    paddingVertical: space.xxs,
    borderRadius: space.xs,
    backgroundColor: color.white,
    alignItems: 'center'
  },
  reviewsSub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xxs
  },
  tabBar: {
    backgroundColor: undefined
  },
  linearGradient: {},
  action: {
    position: 'relative',
    flexDirection: 'row',
    gap: space.s,
    paddingTop: space.xxs,
    alignSelf: 'flex-start'
  },
  iconNavigation: {
    paddingHorizontal: space.s
  },
  lottie: {
    position: 'absolute',
    top: -space.xxs,
    left: -space.xxs,
    height: iconSize.xl,
    aspectRatio: 1
  },
  lottieLike2: {
    position: 'absolute',
    top: -space.xxs,
    left: space.xs,
    height: avatarSize.s,
    aspectRatio: 1
  }
})
