import { TextProps, TextStyle } from 'react-native'
import { SizeType } from 'themes'

export type TextType = 'title' | 'subTitle' | 'content'

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

export type TextPropsType = TextProps & {
  Element?: FunctionComponent<TextProps<T>>
  size?: SizeType
  fontWeight?: FontWeight
  ratio?: number
  opacity?: number
  type?: TextType
  color?: string
  style?: TextStyle
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
}
