import { FlatList, Image, StyleSheet, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { Icon, NavigationBar, Text } from 'components'
import { avatarSize, color, colorRandom, space } from 'themes'
import { BookDetailType } from 'api/books/types'
import { useHeaderMeasurements } from 'react-native-collapsible-tab-view'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  data?: BookDetailType | null
  loading?: boolean
  style?: ViewStyle
}

type ItemType = {
  item: string
  index: number
}

const Header: FC<Props> = ({ data, loading, style }) => {
  const { category, cover, likes, name, views } = data ?? {}

  const { top: topSafe } = useSafeAreaInsets()
  const { top, height } = useHeaderMeasurements()

  const styleAnimatedNavigationBar = useAnimatedStyle(() => {
    const minHeaderHeight = (height.value || 0) - topSafe * 2
    const opacity = interpolate(
      top.value,
      [-minHeaderHeight / 2, -minHeaderHeight],
      [0, 1],
      { extrapolateRight: Extrapolation.CLAMP }
    )

    const translateY = interpolate(
      top.value,
      [-minHeaderHeight / 2, -minHeaderHeight],
      [-minHeaderHeight, 0],
      { extrapolateRight: Extrapolation.CLAMP }
    )

    return { opacity, transform: [{ translateY }] }
  })

  const styleAnimatedOpacity = useAnimatedStyle(() => {
    const minHeaderHeight = (height.value || 0) - topSafe * 2
    const opacity = interpolate(
      top.value,
      [-minHeaderHeight / 2, -minHeaderHeight],
      [1, 0],
      { extrapolateRight: Extrapolation.CLAMP }
    )

    return { opacity }
  })

  const styleAnimatedCover = useAnimatedStyle(() => {
    const minHeaderHeight = (height.value || 0) - topSafe * 2
    const scale = interpolate(top.value, [0, -minHeaderHeight / 2], [1, 0.8], {
      extrapolateRight: Extrapolation.CLAMP
    })

    const translateY = interpolate(
      top.value,
      [0, -minHeaderHeight / 2],
      [0, 24],
      {
        extrapolateRight: Extrapolation.CLAMP
      }
    )

    return { transform: [{ scale }, { translateY }] }
  })

  if (!data || loading) return

  const renderItem = ({ item, index: i }: ItemType) => {
    return (
      <View
        key={i}
        style={[styles.category, { backgroundColor: colorRandom[i] }]}>
        <Text textAlign="center" fontWeight="500" size="s">
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
          <NavigationBar title={name} titleStyle={styles.navigationTitle} />
        </Animated.View>
        {cover ? <Image source={{ uri: cover }} style={styles.banner} /> : null}
        <Animated.View style={[styles.title, styleAnimatedOpacity]}>
          {cover ? (
            <Animated.Image
              source={{ uri: cover }}
              style={[styles.cover, styleAnimatedCover]}
            />
          ) : null}
          <View style={styles.titleSub}>
            <Text size="xl" fontWeight="bold" numberOfLines={3}>
              {name}
            </Text>
            <View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
                data={category}
                renderItem={renderItem}
              />
            </View>
            <View style={styles.reviews}>
              <View style={styles.reviewsSub}>
                <Icon name="heart" color={color.danger} />
                <Text>{likes}</Text>
              </View>
              <View style={styles.reviewsSub}>
                <Icon name="eye" color={color.gray} />
                <Text>{views}</Text>
              </View>
            </View>
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
  banner: {
    width: space.width,
    aspectRatio: 4 / 3
  },
  title: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    gap: space.s,
    marginBottom: space.m
  },
  cover: {
    width: avatarSize.xxl,
    aspectRatio: 3 / 4,
    borderRadius: space.m,
    marginLeft: space.m
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
  category: {
    paddingHorizontal: space.xs,
    paddingVertical: space.xxs,
    borderRadius: space.xs,
    backgroundColor: color.white,
    alignItems: 'center'
  },
  reviews: {
    flexDirection: 'row',
    gap: space.s
  },
  reviewsSub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xxs
  },
  tabBar: {
    backgroundColor: undefined
  },
  linearGradient: {}
})
