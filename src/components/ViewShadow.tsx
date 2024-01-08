import { StyleSheet, View } from 'react-native'
import React from 'react'
import { color, colorRange, space } from 'themes'
import { useThemeStore } from 'stores'
import { ViewCustomProps } from './Row/types'

type Props = ViewCustomProps & {
  borderRadius?: number
  backgroundColor?: string
  shadowColor?: string
}

const ViewShadow = (props: Props) => {
  const {
    children,
    borderRadius = space.s,
    style,
    flex,
    flexDirection,
    alignItems,
    alignContent,
    alignSelf,
    justifyContent,
    gap,
    backgroundColor,
    shadowColor
  } = props
  const { theme } = useThemeStore()

  return (
    <View
      style={[
        styles.container,
        {
          flex: flex ?? undefined,
          flexDirection: flexDirection ?? 'column',
          alignItems: alignItems ?? 'center',
          alignContent: alignContent ?? undefined,
          alignSelf: alignSelf ?? undefined,
          justifyContent: justifyContent ?? 'center',
          gap: gap ?? undefined,
          backgroundColor:
            backgroundColor ||
            (theme === 'dark' ? colorRange.gray[800] : color.white),
          shadowColor:
            shadowColor || (theme === 'dark' ? color.primary : color.black),
          borderRadius
        },
        style
      ]}>
      {children}
    </View>
  )
}

export default ViewShadow

const styles = StyleSheet.create({
  container: {
    padding: space.xs,
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.23,
    shadowRadius: 12.81,
    elevation: 12
  }
})
