import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { forwardRef } from 'react'
import { Icon, Row, Text } from 'components'
import { color, colorRange, space } from 'themes'
import { InputProps, InputRef } from './types'
import { useToggle } from 'hook'
import { useThemeStore } from 'stores'

const Input = forwardRef((props: InputProps, ref: InputRef) => {
  const {
    label,
    labelProps,
    labelStyle,
    contentStyle,
    style,
    iconName,
    iconSize,
    iconColor,
    inputStyle,
    ElementLeft,
    ElementRight,
    secureTextEntry,
    iconVariant,
    notice,
    noticeColor = color.danger,
    noticeStyle,
    // showClear,
    // focusChange,
    maxLength,
    ...rest
  } = props

  const { theme } = useThemeStore()
  const [isSecure, setIsSecure] = useToggle(secureTextEntry || false)

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text
          fontWeight="600"
          style={[styles.label, labelStyle]}
          {...labelProps}>
          {label}
        </Text>
      ) : null}
      <Row
        style={[
          styles.content,
          {
            backgroundColor:
              theme === 'dark' ? colorRange.gray[400] : colorRange.gray[100]
          },
          contentStyle
        ]}>
        {ElementLeft ? (
          ElementLeft
        ) : iconName ? (
          <Icon
            name={iconName}
            size={iconSize}
            color={iconColor}
            variant={iconVariant}
          />
        ) : null}
        <TextInput
          ref={ref}
          {...rest}
          maxLength={maxLength}
          secureTextEntry={isSecure}
          style={[styles.inputStyle, inputStyle]}
        />
        {ElementRight ? (
          ElementRight
        ) : secureTextEntry ? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIsSecure()}>
            <Icon
              name={isSecure ? 'eye-slash' : 'eye'}
              color={colorRange.gray[700]}
            />
          </TouchableOpacity>
        ) : null}
      </Row>
      {notice ? (
        <Row gap={space.xxs}>
          <Icon name="warning" size="s" color={color.danger} />
          <Text
            size="s"
            color={noticeColor}
            fontWeight="500"
            style={noticeStyle}>
            {notice}
          </Text>
        </Row>
      ) : null}
    </View>
  )
})

export default Input

const styles = StyleSheet.create({
  container: {
    gap: space.xxs
  },
  label: {
    marginLeft: space.s
  },
  content: {
    paddingHorizontal: space.xxs,
    paddingVertical: space.xxs,
    borderRadius: space.xs
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 0
  },
  notice: {
    // marginLeft: space.s
  }
})
