import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import {
  ButtonShadow,
  Icon,
  Input,
  NavigationBar,
  Row,
  Text,
  ViewShadow
} from 'components'
import { space } from 'themes'
import { useUsersStore } from 'stores'

const Profile: FC<ScreenProps> = () => {
  const { user } = useUsersStore()
  const handleSetting = () => {
    NavigationService.push(Route.Settings)
  }

  const handleLogin = () => {
    NavigationService.push(Route.Login)
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title="Tài khoản"
        hideBack={true}
        ElementRight={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSetting}
            style={styles.setting}>
            <Icon name="setting-2" size="xl" />
          </TouchableOpacity>
        }
      />

      {!user ? (
        <Row flex={1} justifyContent="center" style={styles.content}>
          <ButtonShadow onPress={handleLogin} type="danger">
            Đăng nhập
          </ButtonShadow>
        </Row>
      ) : null}

      {user ? (
        <View style={styles.content}>
          <ViewShadow alignItems="flex-start" gap={space.s} style={styles.info}>
            <Row>
              <Icon name="user" />
              <Text size="l">: {user?.displayName}</Text>
            </Row>
            <Row>
              <Icon name="sms" />
              <Text size="l">: {user?.email}</Text>
            </Row>
          </ViewShadow>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => NavigationService.push(Route.SuggestedBook)}>
            <Input
              editable={false}
              label="Truyện muốn đọc"
              placeholder="Nhập tên truyện..."
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => NavigationService.push(Route.SuggestedFunction)}>
            <Input
              editable={false}
              label="Chức năng nên có"
              placeholder="Nhập mô tả chức năng bạn muốn có..."
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  info: {
    paddingVertical: space.m
  },
  content: {
    paddingHorizontal: space.m,
    gap: space.m
  },
  buttonLogin: {
    paddingHorizontal: space.m
  },
  setting: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: space.m
  }
})
