import { StyleSheet } from 'react-native'
import React, { ReactNode, Ref, forwardRef, useCallback } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetProps
} from '@gorhom/bottom-sheet'
import { color } from 'themes'

type Props = BottomSheetProps & {
  snapPoints?: string[]
  children: ReactNode
}

const BottomSheet = forwardRef(
  ({ snapPoints, children, ...props }: Props, ref: Ref<BottomSheetModal>) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      ),
      []
    )
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBG}
        backdropComponent={renderBackdrop}
        {...props}>
        {children}
      </BottomSheetModal>
    )
  }
)

export default BottomSheet

const styles = StyleSheet.create({
  bottomSheetBG: {
    backgroundColor: color.dark
  }
})
