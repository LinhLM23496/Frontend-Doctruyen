import React, { useEffect, useState } from 'react'
import { Keyboard, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Dot, Icon, Text } from 'components'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { IconName } from 'components/Icon/IconValue'
import { HEIGHT_BOTTOM_BAR, color, space } from 'themes'
import { useUnReadNotifStore } from 'stores'

interface DetailTabProps {
  name: string
  icon: IconName
}

const detailTab = (name: string): DetailTabProps => {
  switch (name) {
    case 'ListBook':
      return { name: 'Danh sách', icon: 'book' }

    case 'Profile':
      return { name: 'Tài khoản', icon: 'user' }

    default:
      return { name: 'Trang chủ', icon: 'home-1' }
  }
}

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation
}) => {
  const [visit, setVisit] = useState(true)
  const { amount } = useUnReadNotifStore()

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setVisit(false)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setVisit(true)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return visit ? (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const { name, icon } = detailTab(label)

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true
            })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabBar,
              {
                borderColor: isFocused ? color.primary : color.transparent
              }
            ]}>
            <Icon
              name={icon}
              color={isFocused ? color.primary : color.gray}
              variant={isFocused ? 'bold' : 'outline'}
            />
            <Text size="xs" color={isFocused ? color.primary : color.gray}>
              {name}
            </Text>
            {label === 'Profile' && amount > 0 ? (
              <View style={styles.redDot}>
                <Dot style={styles.subRedDot} />
              </View>
            ) : null}
          </TouchableOpacity>
        )
      })}
    </View>
  ) : null
}

export default TabBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.black
  },
  tabBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT_BOTTOM_BAR,
    borderTopWidth: 1
  },
  redDot: {
    position: 'absolute',
    top: space.xxs / 2
  },
  subRedDot: {
    marginLeft: space.m
  }
})
