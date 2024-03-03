import { StyleSheet } from 'react-native'
import React, { Ref, forwardRef, useMemo, useState } from 'react'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '.'
import { color, space } from 'themes'
import { useWhiteList } from 'stores'
import { Button, Row, Text } from 'components'

type Props = {
  onFilter: (filter: string[]) => void
  onClear: () => void
}

const BottomSheetCategories = forwardRef(
  ({ onFilter, onClear }: Props, ref: Ref<BottomSheetModal>) => {
    const { whiteList } = useWhiteList()
    const [selected, setSelected] = useState<string[]>([])
    const snapPoints = useMemo(() => ['50%'], [])

    const handleClear = () => {
      setSelected([])
      onClear()
    }

    const renderCategories = ({ item }: { item: string }) => {
      const handleCategory = () => {
        setSelected((prev) => {
          if (prev.includes(item)) {
            return prev.filter((i) => i !== item)
          }
          return [...prev, item]
        })
      }
      return (
        <Button
          key={item}
          type={selected?.includes(item) ? 'success' : 'teal'}
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
            ListHeaderComponent={
              <Text fontWeight="500" size="xl" color={color.black}>
                Thể loại
              </Text>
            }
            contentContainerStyle={styles.filter}
          />
          <Row gap={space.m} style={styles.buttonFilter}>
            <Button type="teal" flex={1} onPress={handleClear}>
              Xóa lọc
            </Button>
            <Button
              flex={1}
              iconName="search-normal-1"
              onPress={() => onFilter(selected)}>
              Tìm kiếm
            </Button>
          </Row>
        </>
      </BottomSheet>
    )
  }
)

export default BottomSheetCategories

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
    marginLeft: space.m
  }
})
