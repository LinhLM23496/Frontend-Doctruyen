import React, { LegacyRef, forwardRef, useMemo } from 'react'
import { Text as RNText } from 'react-native'
import { TextPropsType } from './type'
import { color, fontSize as FontSize } from 'themes'
import { useThemeStore } from 'stores'

const Text = forwardRef((props: TextPropsType, ref: LegacyRef<RNText>) => {
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
    style
  } = props
  const textSize = (style?.fontSize ?? FontSize?.[size ?? 'm']) * ratio
  const colorStyle = theme === 'dark' ? color.white : color.black

  const opacityType = useMemo(() => {
    switch (type) {
      case 'title':
        return theme === 'dark' ? 0.9 : 1
      case 'subTitle':
        return theme === 'dark' ? 0.7 : 0.9
      case 'content':
        return theme === 'dark' ? 0.5 : 0.8
      default:
        return 1
    }
  }, [type, theme])

  return (
    <Element
      ref={ref}
      {...props}
      style={[
        {
          fontSize: textSize,
          fontWeight,
          textAlign,
          opacity: type ? opacityType : opacity,
          color: props?.color || colorStyle,
          lineHeight: lineHeight(textSize)
        },
        style
      ]}>
      {children}
    </Element>
  )
})

export default Text

const lineHeight = (size: number) => Number(size * 1.4)
