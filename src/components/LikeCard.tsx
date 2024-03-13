import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React from 'react'
import { Row, Text } from 'components'
import { avatarSize, color, colorRange, space } from 'themes'
import moment from 'moment'
import 'moment/locale/vi'
import { StyleProp } from 'react-native'
import { useThemeStore } from 'stores'
import { LikeBookType } from 'api/likes/types'

type Props = {
  data: LikeBookType & {
    createdAt: Date
  }
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

moment.locale('vi')

const LikeCard = ({ data, onPress, style }: Props) => {
  const { _id, name, cover, chapters, status, createdAt } = data ?? {}
  const { theme } = useThemeStore()

  return (
    <TouchableOpacity
      key={_id}
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
          <Row>
            <Text
              type="title"
              fontWeight="600"
              numberOfLines={1}
              style={styles.flex1}>
              {name}
            </Text>
            <Text type="content">({chapters} chương) </Text>
            {status === 1 ? (
              <Text
                type="content"
                size="xs"
                color={color.black}
                style={styles.status}>
                Đã hoàn thành
              </Text>
            ) : null}
          </Row>
          <Text size="s" type="content">
            {moment(createdAt).fromNow()}
          </Text>
        </View>
      </Row>
    </TouchableOpacity>
  )
}

export default React.memo(LikeCard)

const styles = StyleSheet.create({
  container: {
    borderRadius: space.s
  },
  flex1: {
    flexShrink: 1
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
  },
  status: {
    borderWidth: 1,
    borderRadius: space.xs,
    backgroundColor: color.danger,
    paddingVertical: space.xxs,
    paddingHorizontal: space.xxs,
    marginRight: space.s,
    marginTop: space.xxs / 2
  }
})
