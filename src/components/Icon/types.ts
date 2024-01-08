import {
  ImageRequireSource,
  ImageStyle,
  StyleProp,
  ViewProps
} from 'react-native'
import { IconName, IconVariant } from './IconValue'
import { SizeType } from 'themes'

export type IconPropsType = ViewProps & {
  name: React.ValidationMap<IconName>
  source?: ImageRequireSource
  size?: SizeType
  style?: StyleProp<ImageStyle>
  color?: string
  variant?: IconVariant
  loading?: boolean
}
