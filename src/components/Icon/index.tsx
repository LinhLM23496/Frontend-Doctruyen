import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'
import { colorRange, iconSize } from 'themes'
import VectorImage from 'react-native-vector-image'
import icons from 'assets/icons'
import { IconPropsType } from './type'

const Icon: FC<IconPropsType> = (props) => {
  const { name: iconName, color, size, style, variant, source } = props

  const Size = typeof size === 'number' ? size : iconSize?.[size ?? 'm']
  //@ts-ignore
  const Source = source ?? icons?.[variant ?? 'bold']?.[iconName ?? 'home']

  if (props?.loading) {
    return <ActivityIndicator style={{ width: Size, aspectRatio: 1 }} />
  }

  return (
    <VectorImage
      source={Source}
      {...props}
      style={[{ tintColor: color ?? colorRange.gray[400], width: Size, height: Size }, style]}
    />
  )
}

export default Icon
