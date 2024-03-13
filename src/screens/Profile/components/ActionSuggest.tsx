import { Icon, Input, Row, Text, ViewShadow } from 'components'
import { NavigationService, Route } from 'navigation'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useUsersStore } from 'stores'
import { space } from 'themes'

const ActionSuggest = () => {
  const { user } = useUsersStore()
  return (
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
  )
}

export default ActionSuggest

const styles = StyleSheet.create({
  info: {
    paddingVertical: space.m
  },
  content: {
    paddingHorizontal: space.m,
    gap: space.m
  }
})
