import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React from 'react'
import { useHistoryStore } from 'stores'
import { List, Row, Text } from 'components'
import { avatarSize, space } from 'themes'
import { HistoryType } from 'stores/users/types'
import moment from 'moment'
import { StyleProp } from 'react-native'
import { NavigationService, Route } from 'navigation'

type Props = {
  style?: StyleProp<ViewStyle>
}

const History = ({ style }: Props) => {
  const { history, clear } = useHistoryStore()

  const renderHistory = ({ item }: { item: HistoryType }) => {
    const { bookId, nameBook, cover, chapterId, nameChapter, createdAt } =
      item ?? {}

    const handleHistory = () => {
      if (!chapterId) {
        return NavigationService.push(Route.BookDetail, { bookId })
      }

      NavigationService.push(Route.Chapter, { chapterId })
    }
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handleHistory}>
        <Row key={item.bookId} alignItems="flex-start" gap={space.s}>
          {cover ? (
            <Image source={{ uri: cover }} style={styles.image} />
          ) : null}
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
  return (
    <View style={[styles.container, style]}>
      <Text type="title" size="xl" onPress={clear}>
        Truyện đọc gần đây
      </Text>
      <List
        scrollEnabled={false}
        data={history}
        renderItem={renderHistory}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  container: {
    marginTop: space.l,
    paddingHorizontal: space.m
  },
  image: {
    height: avatarSize.m,
    aspectRatio: 1,
    borderRadius: space.s
  },
  list: {
    marginTop: space.s,
    gap: space.s
  },
  content: {
    flex: 1
  }
})
