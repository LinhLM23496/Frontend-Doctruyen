import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { Ref, forwardRef } from 'react'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '.'
import { color, space } from 'themes'
import Text from 'components/Text'

type Props = {
  snapPoints?: string[]
  totalPages: number
  onPress: (numberPage: number) => void
  disabled?: boolean
  currentPage: number
}
const BottomSheetChapter = forwardRef(
  (
    { snapPoints, totalPages, onPress, disabled, currentPage }: Props,
    ref: Ref<BottomSheetModal>
  ) => {
    const renderButton = ({ index }: { index: number }) => {
      const titleButton = `${index * 50 + 1} - ${(index + 1) * 50}`

      const handleButton = () => {
        onPress(index + 1)
        // @ts-ignore
        ref.current?.close()
      }

      return (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          disabled={disabled}
          onPress={handleButton}
          style={[
            styles.button,
            {
              backgroundColor:
                currentPage === index + 1 ? color.danger : color.blue
            }
          ]}>
          <Text textAlign="center" color={color.black} fontWeight="500">
            {titleButton}
          </Text>
        </TouchableOpacity>
      )
    }
    return (
      <BottomSheet ref={ref} snapPoints={snapPoints}>
        <BottomSheetFlatList
          numColumns={3}
          data={new Array(totalPages).fill(0)}
          renderItem={renderButton}
          ListHeaderComponent={
            <Text fontWeight="500" size="xl" color={color.black}>
              Chương
            </Text>
          }
          columnWrapperStyle={styles.bottomSheetSub}
          contentContainerStyle={styles.bottomSheet}
        />
      </BottomSheet>
    )
  }
)

export default BottomSheetChapter

const styles = StyleSheet.create({
  button: {
    width: '30%',
    paddingVertical: space.xs,
    borderRadius: space.xxs
  },
  bottomSheet: {
    gap: space.m,
    paddingHorizontal: space.m
  },
  bottomSheetSub: {
    justifyContent: 'flex-start',
    gap: space.m
  }
})
