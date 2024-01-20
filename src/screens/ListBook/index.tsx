import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import {
  BookCard,
  Icon,
  NavigationBar,
  QueryList,
  ViewShadow
} from 'components'
import { useBookStore } from 'stores'
import { space } from 'themes'

const ListBook: FC<ScreenProps> = () => {
  const renderItem = ({ item }: any) => {
    const handleBook = () => {
      NavigationService.push(Route.BookDetail, { bookId: item._id })
    }

    return (
      <BookCard
        data={item}
        key={item?._id}
        onPress={handleBook}
        style={styles.item}
      />
    )
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'Danh sách truyện'}
        ElementRight={
          <TouchableOpacity>
            <ViewShadow>
              <Icon name="user" />
            </ViewShadow>
          </TouchableOpacity>
        }
      />
      <QueryList
        queryHook={useBookStore}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.listSub}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

export default ListBook

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
  }
})
