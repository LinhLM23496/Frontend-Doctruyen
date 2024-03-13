import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import { ButtonShadow, Icon, NavigationBar, Row } from 'components'
import { space } from 'themes'
import { useUsersStore } from 'stores'
import ActionSuggest from './components/ActionSuggest'
import ListLike from './components/ListLike'

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
        <>
          <ActionSuggest />
          <ListLike />
        </>
      ) : null}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1
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
