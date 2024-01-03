import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Icon, Text } from 'components'
import { GetChapterReposne } from 'api/chapters/types'
import { colorRange, space } from 'themes'

type Props = {
  data: GetChapterReposne
  onPressTitle: () => void
}

const Header = ({ data, onPressTitle }: Props) => {
  const { title, createdBy, likes, views } = data ?? {}
  return (
    <View>
      <Text
        textAlign="center"
        size="xl"
        fontWeight="600"
        onPress={onPressTitle}>
        {title}
      </Text>
      <Text style={styles.author}>
        Tác giả:{' '}
        <Text size="l" fontWeight="600">
          {createdBy}
        </Text>
      </Text>
      <View style={styles.reviews}>
        <View style={styles.reviewsSub}>
          <Icon name="heart" color={colorRange.danger[500]} />
          <Text>{likes}</Text>
        </View>
        <View style={styles.reviewsSub}>
          <Icon name="eye" />
          <Text>{views}</Text>
        </View>
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
    gap: space.xs
  },
  reviewsSub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xxs
  }
})
