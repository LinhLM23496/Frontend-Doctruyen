import React, { useCallback } from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  TouchableOpacity
} from 'react-native'
import { Icon, Text } from 'components'
import { space, fontSize as FontSize, color, SizeType } from 'themes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationService } from 'navigation'

type NavigationBarProps = {
  style?: StyleProp<ViewStyle>
  onBackPress?: (event: GestureResponderEvent) => void
  title?: string | Function
  onPressTitle?: () => void
  subTitle?: string
  subTitleStyle?: StyleProp<TextStyle>
  accessoryRight?: Function
  buttonStyle?: StyleProp<ViewStyle>
  hideBack?: boolean
  titleStyle?: StyleProp<TextStyle>
  numberOfLines?: number
  backgroundColor?: string
  isModal?: boolean
  fontSize?: SizeType
  accessoryLeft?: any
  adjustsFontSizeToFit?: boolean
  absolute?: boolean
  [key: string]: any
}

const NavigationBar = (props: NavigationBarProps) => {
  const {
    style: containerStyle,
    onBackPress,
    title = '',
    subTitle,
    subTitleStyle,
    accessoryRight,
    buttonStyle,
    hideBack = false,
    titleStyle,
    numberOfLines = 1,
    backgroundColor,
    fontSize = 'l',
    accessoryLeft,
    adjustsFontSizeToFit,
    absolute,
    onPressTitle,
    transparent
  } = props

  const { top } = useSafeAreaInsets()
  const renderTitle = useCallback(() => {
    switch (typeof title) {
      case 'string':
        return (
          <Text
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            numberOfLines={numberOfLines}
            size={fontSize}
            type="title"
            onPress={onPressTitle}
            style={[styles.title, titleStyle]}>
            {title}
          </Text>
        )
      case 'function':
        return title()
      default:
        return null
    }
  }, [adjustsFontSizeToFit, fontSize, numberOfLines, title, titleStyle])

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, paddingTop: top + space.s },
        containerStyle,
        absolute ? styles.absolute : {},
        transparent ? styles.transparent : {}
      ]}>
      <View style={styles.accessory}>
        {accessoryLeft ? (
          accessoryLeft()
        ) : !hideBack ? (
          <TouchableOpacity
            onPress={onBackPress ?? NavigationService.goBack}
            style={buttonStyle}>
            <Icon name="arrow-circle-left" size="xl" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.center}>
        {renderTitle()}
        {subTitle ? (
          <Text
            type="subTitle"
            numberOfLines={1}
            style={[styles.subTitle, subTitleStyle]}>
            {subTitle}
          </Text>
        ) : null}
      </View>

      <View style={[styles.accessory, styles.accessoryRight]}>
        {accessoryRight ? accessoryRight() : null}
      </View>
    </View>
  )
}

export default NavigationBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: space.m,
    alignItems: 'center',
    paddingBottom: space.s
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  accessory: {
    flex: 2
  },
  center: {
    flex: 6
  },
  accessoryRight: {
    alignItems: 'flex-end'
  },
  subTitle: {
    marginTop: -space.xxs,
    textAlign: 'center',
    fontSize: FontSize.s
  },
  absolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1
  },
  transparent: {
    backgroundColor: color.transparent
  }
})
