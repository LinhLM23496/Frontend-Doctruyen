import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { Icon, Text, ViewShadow } from 'components'
import { color, colorRange, space } from 'themes'
import { ButtonProps } from './types'
import { ActivityIndicator } from 'react-native'

const ButtonShadow = (props: ButtonProps) => {
  const {
    children,
    onPress,
    style,
    borderRadius,
    backgroundColor,
    shadowColor,
    textColor = color.black,
    type,
    size = 'l',
    fontWeight = '600',
    iconName,
    loading,
    ...rest
  } = props

  const styleButton = useMemo(() => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colorRange.success[500],
          shadowColor: colorRange.success[600]
        }

      case 'danger':
        return {
          backgroundColor: colorRange.danger[500],
          shadowColor: colorRange.danger[600]
        }

      case 'teal':
        return {
          backgroundColor: colorRange.teal[500],
          shadowColor: colorRange.teal[800]
        }

      default:
        return
    }
  }, [type])

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={props?.disabled || loading}
      onPress={onPress}
      {...rest}>
      <ViewShadow
        flexDirection="row"
        backgroundColor={backgroundColor}
        shadowColor={shadowColor}
        borderRadius={borderRadius}
        {...styleButton}
        style={[styles.button, style]}>
        {iconName ? <Icon name={iconName} style={styles.icon} /> : null}
        {typeof children === 'string' ? (
          <Text fontWeight={fontWeight} size={size} color={textColor}>
            {children}
          </Text>
        ) : (
          children
        )}
        {loading ? (
          <ActivityIndicator style={styles.loading} color={color.black} />
        ) : null}
      </ViewShadow>
    </TouchableOpacity>
  )
}

export default ButtonShadow

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: space.m
  },
  icon: {
    marginRight: space.xxs
  },
  loading: {
    marginLeft: space.xxs
  }
})
