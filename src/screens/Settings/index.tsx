import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { NavigationService, ScreenProps } from 'navigation'
import {
  BottomSheet,
  Button,
  NavigationBar,
  SettingsFast,
  Text
} from 'components'
import { color, space } from 'themes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTokenStore, useUsersStore } from 'stores'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { usersAPI } from 'api'

const Settings: FC<ScreenProps> = () => {
  const { bottom } = useSafeAreaInsets()
  const { clear: clearToken } = useTokenStore()
  const { clear } = useUsersStore()
  const { data } = useUsersStore()

  const [loading, setLoading] = useState(false)

  const ref = useRef<BottomSheetModal>(null)

  const handleLogout = () => {
    clearToken()
    clear()
    NavigationService.goBack()
  }
  const handleShowBS = () => {
    ref.current?.present()
  }

  const handleDelete = async () => {
    if (!data?._id) return
    try {
      setLoading(true)
      await usersAPI.deleteUser({ id: data?._id })
      handleLogout()
    } catch (error) {
      ToastAndroid.show('Có lỗi rồi, không xóa được đâu !', ToastAndroid.LONG)
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <NavigationBar title="Cài đặt" />
      <View style={styles.content}>
        <SettingsFast />
        {data ? (
          <View
            style={[
              styles.buttonLogout,
              {
                marginBottom: bottom
              }
            ]}>
            <Button type="teal" onPress={handleLogout}>
              Đăng xuất
            </Button>
            <TouchableOpacity onPress={handleShowBS} style={styles.delete}>
              <Text color={color.danger}>Xóa tài khoản</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <BottomSheet
        ref={ref}
        enableDynamicSizing
        enableContentPanningGesture={false}>
        <BottomSheetView
          style={[styles.BSDelete, { paddingBottom: bottom + space.m }]}>
          <Text
            size="xl"
            type="title"
            textAlign="center"
            style={styles.content}>
            Đừng rời bỏ tôi mà !
          </Text>
          <Button
            type="danger"
            loading={loading}
            onPress={handleDelete}
            style={styles.button}>
            Phải xóa thôi
          </Button>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    marginTop: space.m,
    paddingHorizontal: space.m
  },
  delete: {
    alignSelf: 'flex-start'
  },
  BSDelete: {
    height: space.half_width,
    paddingHorizontal: space.m
  },
  button: {
    alignSelf: 'flex-start'
  },
  buttonLogout: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: space.l
  }
})
