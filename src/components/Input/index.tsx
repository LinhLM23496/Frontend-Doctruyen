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
    showClear,
    onClear,
    // focusChange,
    maxLength,
    multiline,
    ...rest
  } = props

  const { theme } = useThemeStore()
  const [isSecure, setIsSecure] = useToggle(secureTextEntry || false)

  const handleClear = () => {
    if (ref && ref instanceof Object && 'current' in ref) {
      ref?.current?.clear()
      onClear?.()
    }
  }

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
              theme === 'dark' ? colorRange.gray[400] : colorRange.gray[100],
            alignItems: multiline ? 'flex-start' : 'center'
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
            style={{ marginTop: multiline ? space.xxs / 2 : 0 }}
          />
        ) : null}
        <TextInput
          ref={ref}
          multiline={multiline}
          numberOfLines={multiline ? 5 : 1}
          {...rest}
          textAlignVertical={multiline ? 'top' : 'center'}
          maxLength={maxLength}
          secureTextEntry={isSecure}
          style={[
            styles.inputStyle,
            { paddingVertical: multiline ? space.xxs : 0 },
            inputStyle
          ]}
        />
        {showClear && props?.value?.length ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconRight}
            onPress={handleClear}>
            <Icon name={'close-circle'} color={colorRange.gray[700]} />
          </TouchableOpacity>
        ) : null}
        {ElementRight ? (
          ElementRight
        ) : secureTextEntry ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconRight}
            onPress={() => setIsSecure()}>
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
    flex: 1
  },
  notice: {
    // marginLeft: space.s
  },
  iconRight: {
    paddingLeft: space.s
  }
})
