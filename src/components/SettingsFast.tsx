import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC, useState } from 'react'
import { useRatioStore, useThemeStore } from 'stores'
import Text from './Text'
import { color, colorRange, iconSize, space } from 'themes'
import Slider from '@react-native-community/slider'
import Icon from './Icon'
import Switch from './Switch'

type Props = {
  style?: ViewStyle
}

const SettingsFast: FC<Props> = ({ style }) => {
  const { ratio, setRatio } = useRatioStore()
  const { theme } = useThemeStore()
  const [ratioSilder, setRatioSlider] = useState(ratio)

  const handleReset = () => {
    setRatioSlider(1)
    setRatio(1)
  }
  return (
    <View style={[styles.container, style]}>
      <View style={styles.subSettings}>
        <Text type="subTitle" fontWeight="500" size="l" style={styles.subTitle}>
          Cỡ chữ
        </Text>
        <View
          style={[
            styles.box,
            styles.subSlider,
            {
              backgroundColor:
                theme === 'dark' ? colorRange.gray[800] : color.white,
              shadowColor: theme === 'dark' ? color.primary : color.black
            }
          ]}>
          <View style={styles.textTest}>
            <Text
              size="l"
              textAlign="center"
              ratio={ratioSilder}
              type="content">
              Chữ mẫu
            </Text>
          </View>
          <Slider
            style={styles.slider}
            value={ratioSilder}
            minimumValue={0.5}
            maximumValue={2}
            minimumTrackTintColor="red"
            maximumTrackTintColor="blue"
            onValueChange={setRatioSlider}
            onSlidingComplete={setRatio}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleReset}
            style={styles.reset}>
            <Icon name="refresh-circle" size="l" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subSettings}>
        <Text type="subTitle" fontWeight="500" size="l" style={styles.subTitle}>
          Giao diện
        </Text>
        <View
          style={[
            styles.box,
            styles.subBox,
            {
              backgroundColor:
                theme === 'dark' ? colorRange.gray[800] : color.white,
              shadowColor: theme === 'dark' ? color.primary : color.black
            }
          ]}>
          <Switch />
        </View>
      </View>
    </View>
  )
}

export default SettingsFast
const styles = StyleSheet.create({
  container: {
    gap: space.m
  },

  subSettings: {
    gap: space.xxs
  },
  subTitle: {
    marginLeft: space.m
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.23,
    shadowRadius: 12.81,
    elevation: 16,
    borderRadius: space.s
  },
  subBox: {
    paddingHorizontal: space.m,
    paddingVertical: space.s
  },
  textTest: {
    height: 50,
    justifyContent: 'center'
  },
  slider: {
    width: '100%',
    height: iconSize.xl
  },
  subSlider: {
    paddingHorizontal: space.xs,
    paddingVertical: space.s
  },
  reset: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: space.xs
  }
})
