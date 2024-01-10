import { IconName } from 'components/Icon/IconValue'
import { FontWeight } from 'components/Text/types'
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native'
import { SizeType } from 'themes'

export type ButtonProps = TouchableOpacityProps & {
  children: any
  onPress?: () => void
  loading?: boolean
  style?: StyleProp<ViewStyle>
  borderRadius?: number
  backgroundColor?: string
  shadowColor?: string
  textColor?: string
  type?: 'teal' | 'success' | 'danger'
  size?: SizeType
  fontWeight?: FontWeight
  iconName?: React.ValidationMap<IconName>
}
