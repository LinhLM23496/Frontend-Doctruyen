import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React from 'react'
import { Row, Text } from 'components'
import { avatarSize, colorRange, space } from 'themes'
import { HistoryType } from 'stores/users/types'
import moment from 'moment'
import 'moment/locale/vi'
import { StyleProp } from 'react-native'
import { useThemeStore } from 'stores'

type Props = {
  data: HistoryType
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

moment.locale('vi')

const HistoryItem = ({ data, onPress, style }: Props) => {
  const { nameBook, cover, chapterId, nameChapter, createdAt } = data ?? {}
  const { theme } = useThemeStore()

  return (
    <TouchableOpacity
      key={data.bookId}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor:
            theme === 'dark' ? colorRange.gray[800] : colorRange.gray[200]
        },
        style
      ]}>
      <Row alignItems="flex-start" gap={space.s}>
        {cover ? <Image source={{ uri: cover }} style={styles.image} /> : null}
        <View style={styles.content}>
          <Text type="title" fontWeight="600" numberOfLines={1}>
            {nameBook}
          </Text>
          {chapterId ? (
            <Text numberOfLines={1} size="s">
              {nameChapter}
            </Text>
          ) : null}
          <Text size="s" type="content">
            {moment(createdAt).fromNow()}
          </Text>
        </View>
      </Row>
    </TouchableOpacity>
  )
}

export default React.memo(HistoryItem)

const styles = StyleSheet.create({
  container: {
    borderRadius: space.s
  },
  image: {
    height: avatarSize.m,
    aspectRatio: 3 / 4,
    borderRadius: space.xs
  },
  list: {
    marginTop: space.s,
    gap: space.s
  },
  content: {
    flex: 1
  }
})
