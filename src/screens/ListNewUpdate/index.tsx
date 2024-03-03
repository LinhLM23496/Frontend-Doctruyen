import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useRef } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import {
  BottomSheetCategories,
  ChapterCard,
  Icon,
  NavigationBar,
  QueryList
} from 'components'
import { useNewUpdateStore } from 'stores'
import { color, space } from 'themes'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useImmer } from 'use-immer'
import { ChapterCardType } from 'stores/users/types'

type FilterType = {
  search: string
  categories: string[]
}

const ListNewUpdate: FC<ScreenProps> = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [filter, setFilter] = useImmer<FilterType>({
    search: '',
    categories: []
  })

  const handleFilter = () => {
    Keyboard.dismiss()
    bottomSheetRef.current?.present()
  }

  const handleClear = () => {
    setFilter((draft) => {
      draft.categories = []
    })

    bottomSheetRef.current?.close()
  }

  const hanldSearch = (categories: string[]) => {
    setFilter((draft) => {
      draft.categories = categories
    })

    bottomSheetRef.current?.close()
  }

  const renderItem = ({ item }: { item: ChapterCardType }) => {
    const { bookId, chapterId, nameBook, cover } = item ?? {}

    const handleHistory = () => {
      if (!chapterId) {
        return NavigationService.push(Route.BookDetail, { bookId })
      }

      NavigationService.push(Route.Chapter, { chapterId, nameBook, cover })
    }
    return <ChapterCard data={item} onPress={handleHistory} />
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'Truyện mới cập nhật'}
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
        queryHook={useNewUpdateStore}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <BottomSheetCategories
        ref={bottomSheetRef}
        onFilter={hanldSearch}
        onClear={handleClear}
      />
    </View>
  )
}

export default ListNewUpdate

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
