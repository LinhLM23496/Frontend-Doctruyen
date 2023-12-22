import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { BookCard, List, Text } from 'components'
import { avatarSize, space } from 'themes'
import { useSuggestionStore } from 'stores'
import images from 'assets/images'

const Suggestion = () => {
  const { isLoading, data, getData, clear, refetch } = useSuggestionStore()

  useEffect(() => {
    const fetchData = async () => {
      await getData()
    }
    fetchData()
  }, [])

  const renderItem = ({ item, index }: any) => {
    return (
      <BookCard
        key={item?._id}
        data={item}
        onPress={() => {
          index ? clear() : refetch()
        }}
      />
    )
  }
  return (
    <View style={styles.container}>
      <Text size="xl" fontWeight="500" style={styles.title}>
        Gợi ý
      </Text>
      {isLoading ? null : (
        <List
          scrollEnabled={false}
          numColumns={2}
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={
            <Image source={images.empty} style={styles.empty} />
          }
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  )
}

export default Suggestion

const styles = StyleSheet.create({
  container: {
    marginTop: space.xl
  },
  title: {
    marginHorizontal: space.m
  },
  list: {
    marginTop: space.m,
    gap: space.m,
    paddingHorizontal: space.m
  },
  column: {
    gap: space.m
  },
  empty: {
    height: avatarSize.xl,
    aspectRatio: 1,
    alignSelf: 'center'
  }
})
