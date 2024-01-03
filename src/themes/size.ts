import { Dimensions } from 'react-native'

export type SizeType = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | '3xl'

const { width, height } = Dimensions.get('window')
const baseRatioSize = 400 // why 400? because ... ask Giang Ca and me
const ratio = width / baseRatioSize
// const baseUnit = 8;

const mSize = Math.round(20 * ratio)

export const space = {
  width,
  height,
  half_width: Math.round(width / 2),
  half_height: Math.round(height / 2),
  xxs: Math.round(4 * ratio),
  xs: Math.round(8 * ratio),
  s: Math.round(12 * ratio),
  m: mSize,
  l: Math.round(24 * ratio),
  xl: Math.round(32 * ratio)
}

export const fontSize = {
  xxs: Math.round(8 * ratio),
  xs: Math.round(10 * ratio),
  s: Math.round(12 * ratio),
  m: Math.round(14 * ratio),
  l: Math.round(16 * ratio),
  xl: Math.round(24 * ratio),
  xxl: Math.round(30 * ratio),
  '3xl': Math.round(36 * ratio),
  '4xl': Math.round(40 * ratio)
}

export const iconSize = {
  xxs: Math.round(12 * ratio),
  xs: Math.round(16 * ratio),
  s: Math.round(20 * ratio),
  m: Math.round(24 * ratio),
  l: Math.round(28 * ratio),
  xl: Math.round(32 * ratio),
  xxl: Math.round(36 * ratio),
  '3xl': Math.round(64 * ratio)
}

export const avatarSize = {
  xxs: Math.round(24 * ratio),
  xs: Math.round(32 * ratio),
  s: Math.round(40 * ratio),
  m: Math.round(56 * ratio),
  l: Math.round(80 * ratio),
  xl: Math.round(112 * ratio),
  xxl: Math.round(156 * ratio)
}

export const DEFAULT_SNAP = Math.round(space.height * 0.6)

export const BUTTON_ICON_SIZE = Math.round(iconSize.m + space.xs * 2)

export const HEIGHT_BOTTOM_BAR = Math.round(48 * ratio)
