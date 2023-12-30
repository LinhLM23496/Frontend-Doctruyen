import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChapterShort } from 'api/chapters/types'
import { space } from 'themes'
import { Text } from 'components'

type Props = {
  data?: ChapterShort
  loading: boolean
  onPress: (_id: string) => void
}

const Chapter = ({ data, loading, onPress }: Props) => {
  if (!data || loading) return

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(data?._id)}
      style={styles.container}>
      <Text fontWeight="500">{data.title}</Text>
    </TouchableOpacity>
  )
}

export default React.memo(Chapter)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: space.m
  }
})
