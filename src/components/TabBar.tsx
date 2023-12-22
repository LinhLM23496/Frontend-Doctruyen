import React, { useEffect, useState } from 'react'
import { Keyboard, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon, Text } from 'components'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { IconName } from 'components/Icon/IconValue'
import { HEIGHT_BOTTOM_BAR, color } from 'themes'

interface DetailTabProps {
  name: string
  icon: IconName
}

const detailTab = (name: string): DetailTabProps => {
  switch (name) {
    case 'Settings':
      return { name: 'Cài đặt', icon: 'setting' }

    default:
      return { name: 'Trang chủ', icon: 'home' }
  }
}

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const [visit, setVisit] = useState(true)

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
            <Icon name={icon} color={isFocused ? color.primary : color.gray} variant={isFocused ? 'bold' : 'outline'} />
            <Text size="xs" color={isFocused ? color.primary : color.gray}>
              {name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  ) : null
}

export default TabBar

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  tabBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT_BOTTOM_BAR,
    borderTopWidth: 1
  }
})
