import { ForwardedRef, FunctionComponent, Ref } from 'react'
import { FlatList, FlatListProps } from 'react-native'

export type ListProps = FlatListProps<any> & {
  Element?: FunctionComponent
  ref?: ForwardedRef<FlatList<any>>
}

export type RefListType = Ref<FlatList<any>>
