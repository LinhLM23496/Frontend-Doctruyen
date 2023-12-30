import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import { PagingType } from 'api/types'
import { space } from 'themes'

type Props = {
  data: PagingType
  bookId: string
}

const HeaderChapter = ({ data, bookId }: Props) => {
  return (
    <View style={styles.container}>
      <Button title="Đọc từ đầu" />
      <Button title="Đọc mới nhất" />
    </View>
  )
}

export default HeaderChapter

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: space.m
  }
})
