import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import { LikeCard, NavigationBar, QueryList } from 'components'
import { useLikeStore } from 'stores'
import { space } from 'themes'
import { LikeType } from 'api/likes/types'

const ListLike: FC<ScreenProps> = () => {
  const renderItem = ({ item }: { item: LikeType }) => {
    const { book, createdAt } = item ?? {}

    const handleLikeCard = () => {
      return NavigationService.push(Route.BookDetail, { bookId: book._id })
    }
    return <LikeCard data={{ ...book, createdAt }} onPress={handleLikeCard} />
  }
  return (
    <View style={styles.container}>
      <NavigationBar title="Truyện yêu thích" />
      <QueryList
        params={{ search: '' }}
        queryHook={useLikeStore}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

export default ListLike

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    paddingHorizontal: space.m,
    gap: space.m
  },
  listSub: {
    justifyContent: 'space-between'
  },
  item: {
    width: space.half_width - space.m * 1.5
  },
  buttonFilter: {
    gap: space.m,
    paddingHorizontal: space.m,
    paddingVertical: space.s
  },
  subFilter: {
    gap: space.xs
  },
  filter: {
    marginHorizontal: space.m,
    gap: space.s,
    paddingBottom: space.m
  },
  categories: {
    gap: space.s,
    marginBottom: space.m
  },
  category: {
    marginRight: space.s
  },
  subTitle: {
    marginLeft: space.m
  }
})
