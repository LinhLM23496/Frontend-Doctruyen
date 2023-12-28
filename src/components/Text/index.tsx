import React, { FC, forwardRef, useMemo } from 'react'
import { Text as RNText } from 'react-native'
import { TextPropsType } from './type'
import { color, colorRange, fontSize as FontSize } from 'themes'

const Text: FC<TextPropsType> = forwardRef((props, ref) => {
  const { children, fontWeight, type, textAlign, size, style } = props
  const textSize = style?.fontSize ?? FontSize?.[size ?? 'm']
  const colorStyle = useMemo(() => {
    switch (type) {
      case 'hint':
        return colorRange.gray[400]
      case 'white':
        return color.white
      default:
        return color.black
    }
  }, [type])

  return (
    <RNText
      //@ts-ignore
      ref={ref}
      {...props}
      style={[
        {
          fontSize: textSize,
          fontWeight,
          textAlign,
          color: props?.color ?? colorStyle,
          lineHeight: lineHeight(textSize)
        },
        style
      ]}>
      {children}
    </RNText>
  )
})

export default Text

const lineHeight = (size: number) => Number(size * 1.4)
