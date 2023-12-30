import { FunctionComponent } from 'react'
import { FlatList, FlatListProps } from 'react-native'

export type ListProps<T> = FlatListProps<T> & {
  Element?: FunctionComponent<FlatListProps<T>>
  ref?: React.Ref<FlatList<T>>
}
