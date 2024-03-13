import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React, { useEffect } from 'react'
import { LikeCard, List, Row, Text } from 'components'
import { avatarSize, color, space } from 'themes'
import { StyleProp } from 'react-native'
import { NavigationService, Route } from 'navigation'
import { useLikeStore } from 'stores'
import { LikeType } from 'api/likes/types'

type Props = {
  style?: StyleProp<ViewStyle>
}

const ListLike = ({ style }: Props) => {
  const { data, isLoading, getData } = useLikeStore()

  useEffect(() => {
    getData({ page: 1 })
  }, [])

  const renderHistory = ({ item }: { item: LikeType }) => {
    const { book, createdAt } = item ?? {}

    const handleLikeCard = () => {
      return NavigationService.push(Route.BookDetail, { bookId: book._id })
    }
    return <LikeCard data={{ ...book, createdAt }} onPress={handleLikeCard} />
  }

  function handleListNewUpdate() {
    NavigationService.push(Route.ListNewupdate)
  }

  if (!data.length && !isLoading) return null
  return (
    <View style={[styles.container, style]}>
      <Row>
        <Text type="title" size="xl" style={styles.flex1}>
          Truyện yêu thích
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

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <List
          scrollEnabled={false}
          data={data.slice(0, 5)}
          renderItem={renderHistory}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  )
}

export default ListLike

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
