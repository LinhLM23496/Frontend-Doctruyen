import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Icon, Text } from 'components'
import { GetChapterReposne } from 'api/chapters/types'
import { space } from 'themes'

type Props = {
  data: GetChapterReposne
}

const Header = ({ data }: Props) => {
  const { title, createdBy, views } = data ?? {}
  return (
    <View>
      <Text textAlign="center" size="xl" fontWeight="600" type="title">
        {title}
      </Text>
      <Text type="subTitle" style={styles.author}>
        Tác giả:{' '}
        <Text size="l" fontWeight="600">
          {createdBy}
        </Text>
      </Text>
      <View style={styles.reviews}>
        <Icon name="eye" />
        <Text type="subTitle">{views}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {},
  author: {
    marginTop: space.xs
  },
  reviews: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xxs
  }
})
