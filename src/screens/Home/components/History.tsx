import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { useHistoryStore } from 'stores'
import { ChapterCard, List, Text } from 'components'
import { avatarSize, space } from 'themes'
import { ChapterCardType } from 'stores/users/types'
import { StyleProp } from 'react-native'
import { NavigationService, Route } from 'navigation'

type Props = {
  style?: StyleProp<ViewStyle>
}

const History = ({ style }: Props) => {
  const { history } = useHistoryStore()

  const renderHistory = ({ item }: { item: ChapterCardType }) => {
    const { bookId, chapterId } = item ?? {}

    const handleHistory = () => {
      if (!chapterId) {
        return NavigationService.push(Route.BookDetail, { bookId })
      }

      NavigationService.push(Route.Chapter, { chapterId })
    }
    return <ChapterCard data={item} onPress={handleHistory} />
  }

  if (!history.length) return null
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
