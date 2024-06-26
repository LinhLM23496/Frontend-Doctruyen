import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { Icon, Text } from 'components'
import { color, colorRange, space } from 'themes'
import { ButtonProps } from './types'
import { ActivityIndicator } from 'react-native'
import { useThemeStore } from 'stores'

const Button = (props: ButtonProps) => {
  const {
    children,
    onPress,
    style,
    borderRadius,
    backgroundColor,
    textColor: textColorProps,
    type,
    rounded,
    size = 'l',
    fontWeight = '600',
    flex,
    iconName,
    loading,
    ...rest
  } = props

  const { theme } = useThemeStore()

  const styleButton = useMemo(() => {
    switch (type) {
      case 'success':
        return {
          backgroundColor:
            theme === 'dark' ? colorRange.success[500] : colorRange.success[400]
        }

      case 'error':
        return {
          backgroundColor:
            theme === 'dark' ? colorRange.danger[500] : colorRange.danger[400]
        }

      case 'warning':
        return {
          backgroundColor:
            theme === 'dark' ? colorRange.warning[500] : colorRange.warning[400]
        }

      case 'teal':
        return {
          backgroundColor:
            theme === 'dark' ? colorRange.teal[500] : colorRange.teal[400]
        }

      case 'info':
      default:
        return {
          backgroundColor:
            theme === 'dark' ? colorRange.primary[500] : colorRange.primary[400]
        }
    }
  }, [type, theme])

  const styleText = useMemo(() => {
    if (textColorProps) return { color: textColorProps }
    if (type === 'info') return { color: color.white }
    if (type) return { color: color.black }
  }, [textColorProps, type])

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={props?.disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        {
          flex: flex ? flex : undefined,
          borderRadius: borderRadius || rounded ? 500 : space.xs,
          backgroundColor
        },
        styleButton,
        style
      ]}
      {...rest}>
      {iconName ? <Icon name={iconName} style={styles.icon} /> : null}
      {typeof children === 'string' ? (
        <Text
          textAlign="center"
          fontWeight={fontWeight}
          size={size}
          {...styleText}>
          {children}
        </Text>
      ) : (
        children
      )}
      {loading ? (
        <ActivityIndicator style={styles.loading} color={color.black} />
      ) : null}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: space.m,
    paddingVertical: space.xxs,
    justifyContent: 'center'
  },
  icon: {
    marginRight: space.xxs
  },
  loading: {
    marginLeft: space.xxs
  }
})
