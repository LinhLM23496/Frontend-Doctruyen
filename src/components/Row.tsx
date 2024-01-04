import { FlexAlignType, View, ViewProps, ViewStyle } from 'react-native'
import React, { ReactNode, Ref, forwardRef } from 'react'

type Props = ViewProps & {
  children?: ReactNode
  style?: ViewStyle
  flex?: number
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined
  alignItems?: FlexAlignType | undefined
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | undefined
  alignSelf?: 'auto' | FlexAlignType | undefined
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined
  gap?: number
}

const Row = forwardRef((props: Props, ref: Ref<any>) => {
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
