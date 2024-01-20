import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { useHistoryStore } from 'stores'
import { List, Text } from 'components'
import { avatarSize, space } from 'themes'
import { HistoryType } from 'stores/users/types'
import { StyleProp } from 'react-native'
import { NavigationService, Route } from 'navigation'
import HistoryItem from './HistoryItem'

type Props = {
  style?: StyleProp<ViewStyle>
}

const History = ({ style }: Props) => {
  const { history } = useHistoryStore()

  const renderHistory = ({ item }: { item: HistoryType }) => {
    const { bookId, chapterId } = item ?? {}

    const handleHistory = () => {
      if (!chapterId) {
        return NavigationService.push(Route.BookDetail, { bookId })
      }

      NavigationService.push(Route.Chapter, { chapterId })
    }
    return <HistoryItem data={item} onPress={handleHistory} />
  }
  return (
    <View style={[styles.container, style]}>
      <Text type="title" size="xl">
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
