import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import { ButtonShadow, Dot, Icon, NavigationBar, Row } from 'components'
import { space } from 'themes'
import { useUnReadNotifStore, useUsersStore } from 'stores'
import ActionSuggest from './components/ActionSuggest'
import ListLike from './components/ListLike'

const Profile: FC<ScreenProps> = () => {
  const { myUserId } = useUsersStore()
  const { amount } = useUnReadNotifStore()
  const handleSetting = () => {
    NavigationService.push(Route.Settings)
  }

  const handleLogin = () => {
    NavigationService.push(Route.Login)
  }

  const handleNotification = () => {
    NavigationService.push(Route.Notification)
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title="Tài khoản"
        hideBack={true}
        ElementRight={
          <Row>
            {myUserId ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleNotification}
                style={styles.buttonNavigation}>
                <Icon name="notification-bing" size="xl" />
                {amount > 0 ? <Dot style={styles.redDot} /> : null}
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSetting}
              style={styles.buttonNavigation}>
              <Icon name="setting-2" size="xl" />
            </TouchableOpacity>
          </Row>
        }
      />
      <ScrollView>
        {!myUserId ? (
          <Row flex={1} justifyContent="center" style={styles.content}>
            <ButtonShadow onPress={handleLogin} type="danger">
              Đăng nhập
            </ButtonShadow>
          </Row>
        ) : null}

        {myUserId ? (
          <>
            <ActionSuggest />
            <ListLike />
          </>
        ) : null}
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    marginTop: space.half_width,
    paddingHorizontal: space.m
  },
  buttonLogin: {
    paddingHorizontal: space.m
  },
  buttonNavigation: {
    paddingHorizontal: space.s
  },
  redDot: {
    position: 'absolute',
    top: 0,
    right: space.xs
  }
})
