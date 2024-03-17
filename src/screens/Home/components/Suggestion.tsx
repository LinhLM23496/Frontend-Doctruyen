import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { BookCard, List, Row, Text } from 'components'
import { avatarSize, space } from 'themes'
import { useSuggestionStore } from 'stores'
import { NavigationService, Route } from 'navigation'
import { ActivityIndicator } from 'react-native'

const Suggestion = () => {
  const { isLoading, data, getData } = useSuggestionStore()

  useEffect(() => {
    const fetchData = async () => {
      await getData()
    }
    fetchData()
  }, [getData])

  const renderItem = ({ item }: any) => {
    const handleBook = () => {
      NavigationService.push(Route.BookDetail, {
        bookId: item._id
      })
    }

    return (
      <BookCard
        key={item?._id}
        data={item}
        onPress={handleBook}
        style={styles.item}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Row justifyContent="space-between" style={styles.title}>
        <Text size="xl" type="title" fontWeight="500">
          Gợi ý
        </Text>
      </Row>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <List
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  )
}

export default Suggestion

const styles = StyleSheet.create({
  container: {},
  title: {
    marginHorizontal: space.m
  },
  list: {
    marginTop: space.s,
    gap: space.m,
    paddingHorizontal: space.m
  },
  item: {
    width: avatarSize.xxl
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 50
  }
})
