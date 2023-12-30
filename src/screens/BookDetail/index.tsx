import { ActivityIndicator, Button, StyleSheet, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { ScreenProps } from 'navigation'
import { color, space } from 'themes'
import Header from './components/Header'
import { Tabs } from 'react-native-collapsible-tab-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { List, Text } from 'components'
import { useBookDetailStore } from 'stores'
import { useChapterStore } from 'stores/chapters'
import Chapter from './components/Chapter'
import { ChapterShort } from 'api/chapters/types'
import FooterChapters from './components/FooterChapters'

const BookDetail: FC<ScreenProps<'BookDetail'>> = ({ route }) => {
  const { bookId } = route.params

  const { top } = useSafeAreaInsets()

  const { data, isLoading, getData } = useBookDetailStore()
  const {
    data: chapters,
    isLoading: loadingChapters,
    getData: getChapters
  } = useChapterStore()

  useEffect(() => {
    const fetchData = async () => {
      await getData(bookId)
      await getChapters({ bookId })
    }
    fetchData()
  }, [bookId])

  const renderItem = ({ item }: { item: ChapterShort }) => {
    const handleChapter = (chapterId: string) => {
      console.log('chapterId', chapterId)
    }
    return (
      <Chapter
        key={item?._id}
        data={item}
        loading={isLoading}
        onPress={handleChapter}
      />
    )
  }

  if (isLoading) return

  return (
    <View style={styles.container}>
      <Tabs.Container
        renderHeader={() => <Header data={data} loading={isLoading} />}
        minHeaderHeight={top * 2}>
        <Tabs.Tab name="Giới thiệu">
          <View>
            <Tabs.ScrollView contentContainerStyle={styles.introduce}>
              <Text size="l">{data?.description}</Text>
            </Tabs.ScrollView>
            <View style={styles.action}>
              <Button title="Đọc từ đầu" />
              <Button title="Đọc mới nhất" />
            </View>
          </View>
        </Tabs.Tab>
        <Tabs.Tab name="Chương">
          <View>
            {!loadingChapters ? (
              <List
                Element={Tabs.FlatList}
                data={chapters}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listChapter}
              />
            ) : (
              <Tabs.ScrollView>
                <ActivityIndicator
                  size="large"
                  style={styles.loadingChapters}
                />
              </Tabs.ScrollView>
            )}
            <FooterChapters bookId={bookId} />
          </View>
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  )
}

export default BookDetail

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  listChapter: {
    gap: space.s,
    marginTop: space.m,
    paddingBottom: 100 // for FooterChapters
  },
  action: {
    position: 'absolute',
    bottom: space.m,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: space.m
  },
  loadingChapters: {
    marginTop: space.xl
  }
})
