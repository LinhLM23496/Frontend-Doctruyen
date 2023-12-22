import React, { forwardRef } from 'react'
import { FlatList } from 'react-native'
import { ListProps, RefListType } from './types'

const List = forwardRef((props: ListProps, ref?: RefListType) => {
  const { Element = FlatList } = props
  return <Element ref={ref} {...props} />
})

export default List
