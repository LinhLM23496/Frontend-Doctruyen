import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View
} from 'react-native'
import React, { Ref, forwardRef, useCallback, useEffect } from 'react'
import { ListProps } from 'components/List/types'
import { List, Text } from 'components'
import { space } from 'themes'
import { Params, UseBookType } from 'stores/books/types'

type QureyListType = Omit<ListProps<any>, 'data'> & {
  queryHook: Function
  params?: Params
  renderItem: (params: RenderItemType) => JSX.Element
  ListEmptyComponent?: JSX.Element
  Skeleton?: JSX.Element
  hasRefresh?: boolean
}

type RenderItemType = {
  item: any
  index: number
}

const QueryList = forwardRef(
  (props: QureyListType, ref?: Ref<FlatList<any>>) => {
    const {
      Element,
      queryHook,
      params = { key: '' },
      renderItem,
      hasRefresh = true,
      ListEmptyComponent,
      ...rest
    } = props

    const {
      data,
      getData,
      isLoading,
      fetchNextPage,
      refetch,
      hasNextPage,
      isFetched,
      isFetchingNextPage,
      isRefetching
    } = queryHook() as UseBookType

    useEffect(() => {
      const fetchData = async () => {
        await getData(params)
      }

      fetchData()
    }, [params.key])

    const onLoadMore = () => {
      if (!hasNextPage && !data?.length) return
      fetchNextPage(params)
    }

    const renderEmptyState = useCallback(() => {
      if (!isFetched) return null
      if (data?.length > 0) return null
      if (!ListEmptyComponent) {
        return (
          <View>
            <Text>Empty nef</Text>
          </View>
        )
      }
      return ListEmptyComponent
    }, [isFetched, data, ListEmptyComponent])

    const renderData: ListRenderItem<any> = ({
      item,
      index
    }: RenderItemType) => {
      if (item === 'loading') {
        return (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )
      }

      return renderItem({ item, index })
    }

    const onRefresh = () => refetch(params)

    return (
      <List
        {...rest}
        Element={Element}
        ref={ref}
        data={isLoading && !isRefetching ? ['loading'] : data}
        renderItem={renderData}
        refreshing={isRefetching}
        onRefresh={hasRefresh ? onRefresh : undefined}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }
      />
    )
  }
)

export default QueryList

const styles = StyleSheet.create({
  loading: {
    marginVertical: space.xl
  }
})
