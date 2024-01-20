import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import {
  ButtonShadow,
  Icon,
  NavigationBar,
  Row,
  Text,
  ViewShadow
} from 'components'
import { space } from 'themes'
import { useUsersStore } from 'stores'

const Profile: FC<ScreenProps> = () => {
  const { data } = useUsersStore()
  const handleSetting = () => {
    NavigationService.push(Route.Settings)
  }

  const handleLogin = () => {
    NavigationService.push(Route.Login)
  }

  return (
    <View style={[styles.container]}>
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

      {data ? (
        <ViewShadow alignItems="flex-start" gap={space.s} style={styles.info}>
          <Row>
            <Icon name="user" />
            <Text size="l">: {data?.displayName}</Text>
          </Row>
          <Row>
            <Icon name="sms" />
            <Text size="l">: {data?.email}</Text>
          </Row>
        </ViewShadow>
      ) : null}

      <Row flex={1} justifyContent="center" style={styles.content}>
        {!data ? (
          <ButtonShadow onPress={handleLogin} type="danger">
            Đăng nhập
          </ButtonShadow>
        ) : null}
      </Row>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  info: {
    marginHorizontal: space.m,
    paddingVertical: space.m
  },
  content: {
    paddingHorizontal: space.m
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
