import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React from 'react'
import { Text } from 'components'
import { avatarSize, colorRange, space } from 'themes'
import moment from 'moment'
import 'moment/locale/vi'
import { StyleProp } from 'react-native'
import { Notification, objectEmpty, parseRoute } from 'lib'
import { NotificationType } from 'api/notifications/types'
import { images } from 'assets'
import { useNotifStore, useThemeStore } from 'stores'

type Props = {
  data: NotificationType
  style?: StyleProp<ViewStyle>
}

moment.locale('vi')

const NotificationCard = ({ data, style }: Props) => {
  const {
    _id,
    messageId,
    title,
    body,
    data: dataNotif,
    createdAt,
    isRead
  } = data ?? {}
  const image = dataNotif.Param?.image
    ? { uri: dataNotif.Param.image }
    : images.logo

  const { readNotif } = useNotifStore()
  const { theme } = useThemeStore()

  const handleNotif = async () => {
    if (!isRead) {
      await Promise.all([
        Notification.readNotification(messageId),
        readNotif(_id)
      ])
    }

    parseRoute(dataNotif.Route, dataNotif.Param)
  }

  if (!data || objectEmpty(data)) return null

  return (
    <TouchableOpacity
      key={_id}
      activeOpacity={0.8}
      onPress={handleNotif}
      style={[
        styles.container,
        {
          backgroundColor: !isRead
            ? theme === 'dark'
              ? colorRange.teal[800]
              : colorRange.teal[200]
            : undefined
        },
        style
      ]}>
      <Image source={image} style={styles.logo} />
      <View style={styles.flex1}>
        <Text fontWeight="600">{title}</Text>
        <Text size="s" numberOfLines={2}>
          {body}
        </Text>
        <Text size="xs">{moment(createdAt).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(NotificationCard)

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: space.s,
    alignItems: 'center',
    paddingVertical: space.xxs,
    paddingHorizontal: space.m
  },
  logo: {
    width: avatarSize.s,
    aspectRatio: 1,
    borderRadius: avatarSize.s
  }
})
