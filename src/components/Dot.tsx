import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { color, iconSize } from 'themes'

type Props = {
  size?: number
  color?: string
  style?: StyleProp<ViewStyle>
}

const Dot = ({
  size = iconSize.xxs,
  color: colorIcon = color.danger,
  style
}: Props) => {
  return (
    <View
      style={[
        styles.dot,
        {
          height: size,
          backgroundColor: colorIcon
        },
        style
      ]}
    />
  )
}

export default Dot

const styles = StyleSheet.create({
  dot: {
    aspectRatio: 1,
    borderRadius: 100
  }
})
