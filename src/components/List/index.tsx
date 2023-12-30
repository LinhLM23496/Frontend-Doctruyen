import React, { Ref, forwardRef } from 'react'
import { FlatList } from 'react-native'
import { ListProps } from './types'

const List = forwardRef((props: ListProps<any>, ref?: Ref<FlatList<any>>) => {
  const { Element = FlatList, ...rest } = props
  return <Element ref={ref} {...rest} />
})

export default List
