import { TextProps, TextStyle, StyleProp } from 'react-native'
import { SizeType } from 'themes'

export type TextType = 'normal' | 'hint' | 'white'

export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export type TextPropsType = TextProps & {
  size?: SizeType
  fontWeight?: FontWeight
  type?: TextType
  color?: string
  style?: StyleProp<TextStyle>
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
}
