import { Button, StyleSheet, View } from 'react-native'
import React, { Ref, forwardRef } from 'react'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '.'
import { colorRange, space } from 'themes'
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
        <View key={index} style={styles.button}>
          <Button
            title={titleButton}
            disabled={disabled}
            color={
              currentPage === index + 1
                ? colorRange.danger[300]
                : colorRange.primary[300]
            }
            onPress={handleButton}
          />
        </View>
      )
    }
    return (
      <BottomSheet ref={ref} snapPoints={snapPoints}>
        <BottomSheetFlatList
          numColumns={3}
          data={new Array(totalPages).fill(0)}
          renderItem={renderButton}
          ListHeaderComponent={
            <Text fontWeight="500" size="xl">
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
    width: '30%'
  },
  bottomSheet: {
    gap: space.m,
    paddingHorizontal: space.m
  },
  bottomSheetSub: {
    justifyContent: 'space-between'
  }
})
