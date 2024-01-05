import React, { ReactNode, Ref, forwardRef, useCallback } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetProps
} from '@gorhom/bottom-sheet'
import { color, colorRange } from 'themes'
import { useThemeStore } from 'stores'

type Props = BottomSheetProps & {
  snapPoints?: string[]
  children: ReactNode
}

const BottomSheet = forwardRef(
  ({ snapPoints, children, ...props }: Props, ref: Ref<BottomSheetModal>) => {
    const { theme } = useThemeStore()
    const renderBackdrop = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-shadow
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
        backgroundStyle={{
          backgroundColor: theme === 'dark' ? colorRange.gray[900] : color.white
        }}
        backdropComponent={renderBackdrop}
        {...props}>
        {children}
      </BottomSheetModal>
    )
  }
)

export default BottomSheet
