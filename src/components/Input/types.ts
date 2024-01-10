import {
  IconVariant,
  IconName as IconNameType
} from 'components/Icon/IconValue'
import { ReactNode, Ref, ValidationMap } from 'react'
import { TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native'
import { TextProps } from 'react-native'
import { SizeType } from 'themes'

export type InputRef = Ref<TextInput>

export type InputProps = TextInputProps & {
  label?: string
  iconName?: ValidationMap<IconNameType>
  labelProps?: TextProps
  labelStyle?: TextStyle
  contentStyle?: ViewStyle
  style?: ViewStyle
  inputStyle?: ViewStyle
  iconColor?: string
  iconSize?: SizeType
  iconVariant?: IconVariant
  notice?: string
  noticeColor?: string
  noticeStyle?: TextStyle
  ElementRight?: ReactNode
  ElementLeft?: ReactNode
  secureTextEntry?: boolean
  showClear?: boolean
  focusChange?: (value: boolean) => void
  maxLength?: number
}
