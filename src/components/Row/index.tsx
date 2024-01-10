import { View } from 'react-native'
import React, { Ref, forwardRef } from 'react'
import { ViewCustomProps } from './types'

const Row = forwardRef((props: ViewCustomProps, ref: Ref<any>) => {
  const {
    children,
    style,
    flex,
    flexDirection,
    alignItems,
    alignContent,
    alignSelf,
    justifyContent,
    gap
  } = props
  return (
    <View
      ref={ref}
      style={[
        {
          flex: flex ?? undefined,
          flexDirection: flexDirection ?? 'row',
          alignItems: alignItems ?? 'center',
          alignContent: alignContent ?? undefined,
          alignSelf: alignSelf ?? undefined,
          justifyContent: justifyContent ?? undefined,
          gap: gap ?? undefined
        },
        style
      ]}>
      {children}
    </View>
  )
})

export default Row
