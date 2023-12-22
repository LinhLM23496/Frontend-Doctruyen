import { ImageRequireSource, ImageStyle, StyleProp, ViewProps } from 'react-native'
import { IconName as IconNameType, IconVariant } from './IconValue'
import { SizeType } from 'themes'

export const IconName: React.ValidationMap<IconNameType>

export type IconPropsType = ViewProps & {
  name: IconName
  source?: ImageRequireSource
  size?: SizeType
  style?: StyleProp<ImageStyle>
  color?: string
  variant?: IconVariant
  loading?: boolean
}
