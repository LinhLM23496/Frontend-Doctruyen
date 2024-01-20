import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC, useState } from 'react'
import { useRatioStore } from 'stores'
import Text from './Text'
import { color, iconSize, space } from 'themes'
import Slider from '@react-native-community/slider'
import Icon from './Icon'
import Switch from './Switch'
import ViewShadow from './ViewShadow'

type Props = {
  style?: ViewStyle
}

const SettingsFast: FC<Props> = ({ style }) => {
  const { ratio, setRatio } = useRatioStore()
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
        <ViewShadow style={styles.subSlider}>
          <View style={styles.textTest}>
            <Text
              size="xl"
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
            maximumValue={1.5}
            minimumTrackTintColor={color.danger}
            maximumTrackTintColor={color.blue}
            onValueChange={setRatioSlider}
            onSlidingComplete={setRatio}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleReset}
            style={styles.reset}>
            <Icon name="refresh-circle" size="l" />
          </TouchableOpacity>
        </ViewShadow>
      </View>
      <View style={styles.subSettings}>
        <Text type="subTitle" fontWeight="500" size="l" style={styles.subTitle}>
          Giao diện
        </Text>
        <ViewShadow style={styles.subBox}>
          <Switch />
        </ViewShadow>
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
