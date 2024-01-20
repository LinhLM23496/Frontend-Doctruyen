import {
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import {
  BookCard,
  BottomSheet,
  Button,
  Icon,
  Input,
  NavigationBar,
  QueryList,
  Row,
  Text
} from 'components'
import { useBookStore } from 'stores'
import { color, space } from 'themes'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useImmer } from 'use-immer'
import { useDebounce } from 'hook'
import { CATEGORY_LIST } from 'lib'

const ODIR = [
  { value: 'likes', label: 'Lượt thích' },
  { value: 'views', label: 'Lượt xem' }
]

type FilterType = {
  search: string
  categories: string[]
  order: 'likes' | 'views'
  odir: 'asc' | 'desc'
}

const ListBook: FC<ScreenProps> = () => {
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

  const handleDir = () => {
    setFilter((draft) => {
      draft.odir = filter.odir === 'desc' ? 'asc' : 'desc'
    })
  }

  const handleClean = () => {
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

  const renderCategories = ({ item }: { item: string }) => {
    const handleCategory = () => {
      setFilter((draft) => {
        if (filter.categories?.includes(item)) {
          draft.categories = filter.categories.filter((i) => i !== item)
        } else {
          draft.categories = [...filter.categories, item]
        }
      })
    }
    return (
      <Button
        key={item}
        type={filter.categories?.includes(item) ? 'success' : 'teal'}
        onPress={handleCategory}
        style={styles.category}
        size="m">
        {item}
      </Button>
    )
  }

  const renderOrder = ({ item }: any) => {
    const { value, label } = item

    const handleOrder = () => {
      if (filter.order === value) return

      setFilter((draft) => {
        draft.order = value
      })
    }

    return (
      <Button
        key={value}
        type={filter.order === value ? 'success' : 'teal'}
        onPress={handleOrder}
        size="m"
        style={styles.category}>
        {label}
      </Button>
    )
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'Danh sách truyện'}
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
            value={search}
            onChangeText={setSearch}
            iconName="search-normal-1"
            iconColor={color.teal}
            placeholder="Tìm kiếm"
          />
        }
        columnWrapperStyle={styles.listSub}
        contentContainerStyle={styles.list}
      />
      <BottomSheet ref={bottomSheetRef} enableDynamicSizing>
        <BottomSheetView style={styles.filter}>
          <Row justifyContent="space-between">
            <Text type="title" size="xl">
              Lọc
            </Text>

            <TouchableOpacity onPress={handleClean}>
              <Text color={color.danger}>Xóa lọc</Text>
            </TouchableOpacity>
          </Row>
          <View style={styles.subFilter}>
            <Text type="subTitle" size="l" style={styles.subTitle}>
              Sắp xếp
            </Text>
            <Row justifyContent="space-between">
              <FlatList horizontal data={ODIR} renderItem={renderOrder} />
              <TouchableOpacity onPress={handleDir}>
                <Icon
                  name="arrange-square-2"
                  size="xl"
                  color={filter.odir === 'desc' ? color.success : color.gray}
                />
              </TouchableOpacity>
            </Row>
          </View>
          <View style={styles.subFilter}>
            <Text type="subTitle" size="l" style={styles.subTitle}>
              Thể loại
            </Text>
            <FlatList
              scrollEnabled={false}
              numColumns={3}
              data={CATEGORY_LIST}
              renderItem={renderCategories}
              contentContainerStyle={styles.categories}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
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
  },
  subFilter: {
    gap: space.xs
  },
  filter: {
    marginHorizontal: space.m,
    gap: space.s
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
