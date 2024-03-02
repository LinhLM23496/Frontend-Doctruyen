import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { Ref, forwardRef, useMemo } from 'react'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '.'
import { color, space } from 'themes'
import { useWhiteList } from 'stores'
import { Button, Icon, Row, Text } from 'components'
import { useImmer } from 'use-immer'

type Props = {
  onFilter: (filter: FilterType) => void
  onClear: () => void
}

type FilterType = {
  categories: string[]
  order: 'likes' | 'views'
  odir: 'asc' | 'desc'
}

const ODIR = [
  { value: 'likes', label: 'Lượt thích' },
  { value: 'views', label: 'Lượt xem' }
]

const BottomSheetFilter = forwardRef(
  ({ onFilter, onClear }: Props, ref: Ref<BottomSheetModal>) => {
    const { whiteList } = useWhiteList()
    const [filter, setFilter] = useImmer<FilterType>({
      categories: [],
      order: 'likes',
      odir: 'desc'
    })
    const snapPoints = useMemo(() => ['70%'], [])

    const handleClear = () => {
      setFilter((draft) => {
        draft.odir = 'desc'
        draft.categories = []
        draft.order = 'likes'
      })
      onClear()
    }

    const handleDir = () => {
      setFilter((draft) => {
        draft.odir = filter.odir === 'desc' ? 'asc' : 'desc'
      })
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

    const renderHeader = () => {
      return (
        <View>
          <Text type="title" size="xl">
            Lọc
          </Text>

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

          <Text type="subTitle" size="l" style={styles.subTitle}>
            Thể loại
          </Text>
        </View>
      )
    }

    const renderCategories = ({ item }: { item: string }) => {
      const handleCategory = () => {
        setFilter((draft) => {
          if (draft.categories.includes(item)) {
            draft.categories = draft.categories.filter((i) => i !== item)
          } else {
            draft.categories.push(item)
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
    return (
      <BottomSheet ref={ref} snapPoints={snapPoints}>
        <>
          <BottomSheetFlatList
            numColumns={3}
            data={whiteList.categories}
            renderItem={renderCategories}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.filter}
          />
          <Row gap={space.m} style={styles.buttonFilter}>
            <Button type="teal" flex={1} onPress={handleClear}>
              Xóa lọc
            </Button>
            <Button
              flex={1}
              iconName="search-normal-1"
              onPress={() => onFilter(filter)}>
              Tìm kiếm
            </Button>
          </Row>
        </>
      </BottomSheet>
    )
  }
)

export default BottomSheetFilter

const styles = StyleSheet.create({
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
    marginTop: space.m,
    marginLeft: space.m
  }
})
