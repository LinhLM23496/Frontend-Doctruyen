import { ComponentClass, FunctionComponent } from 'react'
import { StyleProp, TextProps, TextStyle } from 'react-native'
import { AnimateProps } from 'react-native-reanimated'
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
  Element?:
    | FunctionComponent<TextProps>
    | ComponentClass<AnimateProps<TextProps>, any>
  size?: SizeType
  fontWeight?: FontWeight
  ratio?: number
  opacity?: number
  type?: TextType
  color?: string
  style?: StyleProp<TextStyle>
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
}
