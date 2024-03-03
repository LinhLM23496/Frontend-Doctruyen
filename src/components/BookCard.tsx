import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React, { FC } from 'react'
import { color, colorRange, fontSize, space } from 'themes'
import Icon from './Icon'
import Text from './Text'
import { BookShortType } from 'api/books/types'
import { formatNumber } from 'lib'

type Props = {
  data: BookShortType
  onPress: (data: any) => void
  style?: StyleProp<ViewStyle>
}

const BookCard: FC<Props> = ({ data, onPress, style }) => {
  const { cover, chapters, likes, name, views, status } = data ?? {}
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Image source={{ uri: cover }} style={styles.cover} />
        <View style={[styles.containerIcon, styles.chapters]}>
          <Icon name={'book'} size="s" color={colorRange.primary[500]} />
          <Text fontWeight="500" color={color.black}>
            {chapters}
          </Text>
        </View>
        <View style={[styles.containerIcon, styles.likes]}>
          <Icon name={'heart'} size="s" color={colorRange.danger[500]} />
          <Text fontWeight="500" color={color.black}>
            {likes}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text
          size="l"
          fontWeight="500"
          type="subTitle"
          numberOfLines={2}
          style={styles.contentSub}>
          {name}
        </Text>
        <View style={styles.views}>
          <Icon name={'eye'} size="xs" />
          <Text type="content">{formatNumber(views)}</Text>
          {status === 1 ? (
            <View style={styles.box}>
              <Text
                type="content"
                fontWeight="bold"
                size="xs"
                color={color.black}>
                {'Hoàn thành'}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  )
}

export default BookCard

const styles = StyleSheet.create({
  container: {
    gap: space.xs
  },
  cover: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: space.s
  },
  containerIcon: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    gap: space.xxs,
    paddingHorizontal: space.xs,
    paddingVertical: space.xxs / 2
  },
  chapters: {
    backgroundColor: colorRange.warning[100],
    borderTopRightRadius: space.s,
    borderBottomLeftRadius: space.s
  },
  likes: {
    right: 0,
    backgroundColor: colorRange.info[100],
    borderTopLeftRadius: space.s,
    borderBottomRightRadius: space.s
  },
  content: {
    gap: space.xxs
  },
  contentSub: {
    lineHeight: fontSize.m * 1.3
  },
  views: {
    maxWidth: '100%',
    flexDirection: 'row',
    gap: space.xs,
    alignItems: 'center'
  },
  box: {
    alignSelf: 'flex-start',
    paddingHorizontal: space.xs,
    paddingVertical: space.xxs,
    borderRadius: space.xs,
    backgroundColor: colorRange.danger[400]
  }
})
