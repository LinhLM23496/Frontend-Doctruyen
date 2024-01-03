import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React, { FC } from 'react'
import { colorRange, space } from 'themes'
import Icon from './Icon'
import Text from './Text'

type Props = {
  data: any
  onPress: (data: any) => void
  style?: StyleProp<ViewStyle>
}

const BookCard: FC<Props> = ({ data, onPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Image source={{ uri: data?.cover }} style={styles.cover} />
        <View style={[styles.containerIcon, styles.chapters]}>
          <Icon name={'book'} size="s" color={colorRange.primary[500]} />
          <Text fontWeight="600">{data?.chapters}</Text>
        </View>
        <View style={[styles.containerIcon, styles.likes]}>
          <Icon name={'heart'} size="s" color={colorRange.danger[500]} />
          <Text fontWeight="500">{data?.likes}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text
          size="l"
          fontWeight="500"
          numberOfLines={2}
          style={styles.contentSub}>
          {data?.name}
        </Text>
        <View style={styles.views}>
          <Icon name={'eye'} size="xs" />
          <Text type="hint">{data?.views}</Text>
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
    backgroundColor: colorRange.warning['100'],
    borderTopRightRadius: space.s,
    borderBottomLeftRadius: space.s
  },
  likes: {
    right: 0,
    backgroundColor: colorRange.info['100'],
    borderTopLeftRadius: space.s,
    borderBottomRightRadius: space.s
  },
  content: {
    flex: 1,
    gap: space.xxs
  },
  contentSub: {
    flex: 1
  },
  views: {
    flexDirection: 'row',
    gap: space.xs,
    alignItems: 'center'
  }
})
