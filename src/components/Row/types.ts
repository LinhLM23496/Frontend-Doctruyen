import { ReactNode } from 'react'
import { FlexAlignType, ViewProps, ViewStyle } from 'react-native'

export type ViewCustomProps = ViewProps & {
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
