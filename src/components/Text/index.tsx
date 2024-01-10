import React, { FC, LegacyRef, forwardRef, useMemo } from 'react'
import { Text as RNText, StyleProp, TextStyle } from 'react-native'
import { TextPropsType } from './types'
import { color, fontSize as FontSize } from 'themes'
import { useThemeStore } from 'stores'

const Text: FC<TextPropsType> = forwardRef((props, ref?: LegacyRef<RNText>) => {
  const { theme } = useThemeStore()

  const {
    Element = RNText,
    children,
    fontWeight,
    type,
    textAlign,
    size,
    ratio = 1,
    opacity = 1,
    style: styleContainer,
    ...rest
  } = props

  const mergeStyles: StyleProp<TextStyle> = useMemo(() => {
    if (!Array.isArray(styleContainer)) {
      return styleContainer
    }
    const mergedStyle = {}
    styleContainer.forEach((style) => {
      if (style) {
        Object.assign(mergedStyle, style)
      }
    })

    return mergedStyle
  }, [styleContainer])

  const textSize = (mergeStyles?.fontSize || FontSize?.[size ?? 'm']) * ratio
  const colorStyle = theme === 'dark' ? color.white : color.black

  const opacityType = useMemo(() => {
    switch (type) {
      case 'title':
        return theme === 'dark' ? 0.9 : 1
      case 'subTitle':
        return theme === 'dark' ? 0.7 : 0.9
      case 'content':
        return theme === 'dark' ? 0.6 : 0.8
      default:
        return 1
    }
  }, [type, theme])

  return (
    <Element
      //@ts-ignore
      ref={ref}
      {...rest}
      style={[
        {
          fontSize: textSize,
          fontWeight,
          textAlign,
          opacity: type ? opacityType : opacity,
          color: props?.color || colorStyle,
          lineHeight: lineHeight(textSize)
        },
        mergeStyles
      ]}>
      {children}
    </Element>
  )
})

export default Text

const lineHeight = (size: number) => Number(size * 1.4)
