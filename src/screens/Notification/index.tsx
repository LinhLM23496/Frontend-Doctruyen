import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { ScreenProps } from 'navigation'
import { NavigationBar, QueryList, Text } from 'components'
import { useNotifStore, useUnReadNotifStore } from 'stores'
import { NotificationType } from 'api/notifications/types'
import NotificationCard from './components/NotificationCard'
import { Notification as NotificationMessage, formatNumber } from 'lib'
import { space } from 'themes'

const Notification: FC<ScreenProps> = () => {
  const renderItem = ({ item }: { item: NotificationType }) => {
    return <NotificationCard key={item?._id} data={item} />
  }
  return (
    <View style={styles.container}>
      <NavigationBar title="Thông báo" ElementRight={<ReadAll />} />
      <QueryList
        params={{ search: '' }}
        queryHook={useNotifStore}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Notification

const ReadAll = () => {
  const { readAllNotif } = useNotifStore()
  const { amount } = useUnReadNotifStore()

  const readAll = async () => {
    if (amount <= 0) return

    await Promise.all([
      NotificationMessage.readAllNotification(),
      readAllNotif()
    ])
  }

  return (
    <TouchableOpacity
      disabled={amount <= 0}
      activeOpacity={0.8}
      onPress={readAll}
      style={styles.readAll}>
      <Text numberOfLines={1}>
        Đọc tất cả
        {amount > 0 ? (
          <Text size="xs">{`(${formatNumber(amount)})`}</Text>
        ) : null}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flex1: {
    flex: 1
  },
  readAll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: space.m
  }
})
