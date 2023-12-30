import React, { Ref, forwardRef } from 'react'
import { FlatList, Image, StyleSheet } from 'react-native'
import { ListProps } from './types'
import images from 'assets/images'
import { avatarSize } from 'themes'

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
