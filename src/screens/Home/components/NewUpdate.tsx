import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChapterCard, List, Row, Text } from 'components'
import { avatarSize, color, space } from 'themes'
import { StyleProp } from 'react-native'
import { NavigationService, Route } from 'navigation'
import { getListNewUpdate } from 'api/chapters'
import { ChapterCardType } from 'stores/users/types'

type Props = {
  style?: StyleProp<ViewStyle>
}

const NewUpdate = ({ style }: Props) => {
  const [data, setData] = useState<ChapterCardType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await getListNewUpdate({ page: 1, limit: 5 })
        setData(res.data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const renderHistory = ({ item }: { item: ChapterCardType }) => {
    const { bookId, chapterId, nameBook, cover } = item ?? {}

    const handleHistory = () => {
      if (!chapterId) {
        return NavigationService.push(Route.BookDetail, { bookId })
      }

      NavigationService.push(Route.Chapter, { chapterId, nameBook, cover })
    }
    return <ChapterCard data={item} onPress={handleHistory} />
  }

  function handleListNewUpdate() {
    NavigationService.push(Route.ListNewupdate)
  }

  if (!data.length && !loading) return null
  return (
    <View style={[styles.container, style]}>
      <Row>
        <Text type="title" size="xl" style={styles.flex1}>
          Truyện mới cập nhật
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleListNewUpdate}
          style={styles.button}>
          <Text fontWeight="500" color={color.primary}>
            Xem thêm
          </Text>
        </TouchableOpacity>
      </Row>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <List
          scrollEnabled={false}
          data={data}
          renderItem={renderHistory}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  )
}

export default NewUpdate

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
  },
  loading: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 50
  },
  flex1: {
    flex: 1
  },
  button: {
    paddingVertical: space.xxs,
    paddingLeft: space.s
  }
})
