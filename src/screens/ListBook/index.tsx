import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import {
  BookCard,
  BottomSheetFilter,
  Icon,
  Input,
  NavigationBar,
  QueryList
} from 'components'
import { useBookStore } from 'stores'
import { color, space } from 'themes'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useImmer } from 'use-immer'
import { useDebounce } from 'hook'

type FilterType = {
  search: string
  categories: string[]
  order: 'likes' | 'views'
  odir: 'asc' | 'desc'
}

const ListBook: FC<ScreenProps> = () => {
  const refInput = useRef(null)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [filter, setFilter] = useImmer<FilterType>({
    search: '',
    categories: [],
    order: 'likes',
    odir: 'desc'
  })
  const [search, setSearch] = useState('')
  const keyword = useDebounce(search)

  useEffect(() => {
    updateSearch(keyword)
  }, [keyword])

  const updateSearch = (text: string) => {
    setFilter((draft) => {
      draft.search = text
    })
  }

  const handleFilter = () => {
    Keyboard.dismiss()
    bottomSheetRef.current?.present()
  }

  const onFilter = (newFilter: Omit<FilterType, 'search'>) => {
    setFilter((draft) => {
      draft.categories = newFilter.categories
      draft.order = newFilter.order
      draft.odir = newFilter.odir
    })

    bottomSheetRef.current?.close()
  }

  const handleClear = () => {
    setFilter((draft) => {
      draft.odir = 'desc'
      draft.categories = []
      draft.order = 'likes'
    })

    bottomSheetRef.current?.close()
  }

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
        hideBack={true}
        ElementRight={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleFilter}
            style={styles.buttonFilter}>
            <Icon name="filter-add" color={color.primary} />
          </TouchableOpacity>
        }
      />
      <QueryList
        params={filter}
        queryHook={useBookStore}
        renderItem={renderItem}
        numColumns={2}
        ListHeaderComponent={
          <Input
            ref={refInput}
            value={search}
            onChangeText={setSearch}
            iconName="search-normal-1"
            iconColor={color.teal}
            placeholder="Tìm kiếm"
            showClear={true}
            onClear={() => setSearch('')}
          />
        }
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        keyExtractor={(item) => item._id}
        keyboardDismissMode="on-drag"
        columnWrapperStyle={styles.listSub}
        contentContainerStyle={styles.list}
      />
      <BottomSheetFilter
        ref={bottomSheetRef}
        onFilter={onFilter}
        onClear={handleClear}
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
  },
  buttonFilter: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: space.m
  }
})
