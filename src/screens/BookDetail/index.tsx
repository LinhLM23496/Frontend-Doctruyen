import { StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { ScreenProps } from 'navigation'
import { Text } from 'components'
import { booksAPI } from 'api'
import { color, space } from 'themes'
import Header from './components/Header'
import { BookDetailType } from 'api/books/types'
import { Tabs } from 'react-native-collapsible-tab-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BookDetail: FC<ScreenProps<'BookDetail'>> = ({ route }) => {
  const { bookId } = route.params

  const { top } = useSafeAreaInsets()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<BookDetailType>()
  const { chapters, description } = data ?? {}

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await booksAPI.getBookDetail({ bookId })
        setData(res)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return

  return (
    <Tabs.Container
      renderHeader={() => <Header data={data} loading={isLoading} />}
      minHeaderHeight={top * 2}>
      <Tabs.Tab name="Giới thiệu">
        <Tabs.ScrollView contentContainerStyle={styles.introduce}>
          <Text size="l">{description}</Text>
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Chương">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  )
}

export default BookDetail

const styles = StyleSheet.create({
  container: {},
  introduce: {
    marginTop: space.m,
    paddingHorizontal: space.m
  },
  category: {
    paddingHorizontal: space.xs,
    paddingVertical: space.xxs,
    borderRadius: space.xs,
    backgroundColor: color.white,
    alignItems: 'center'
  },
  box: {
    height: 250,
    width: '100%'
  },
  boxA: {
    backgroundColor: 'white'
  },
  boxB: {
    backgroundColor: '#D8D8D8'
  }
})
