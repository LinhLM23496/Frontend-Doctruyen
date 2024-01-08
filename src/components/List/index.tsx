import React, { Ref, forwardRef } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'
import { ListProps } from './types'
import { avatarSize } from 'themes'
import { images } from 'assets'

const List = forwardRef((props: ListProps<any>, ref?: Ref<FlatList<any>>) => {
  const { Element = FlatList, ...rest } = props

  const renderEmptyState = () => {
    return <Image source={images.empty} style={styles.empty} />
  }

  return <Element ref={ref} ListEmptyComponent={renderEmptyState} {...rest} />
})

export default List

const styles = StyleSheet.create({
  empty: {
    alignSelf: 'center',
    height: avatarSize.xxl,
    aspectRatio: 1
  }
})
