import { ActivityIndicator, Button, StyleSheet, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import { HEIGHT_NIVAGATION_BAR, color, space } from 'themes'
import Header from './components/Header'
import { Tabs } from 'react-native-collapsible-tab-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { List, NavigationBar, Row, Text } from 'components'
import { useBookDetailStore, useChapterStore } from 'stores'
import Chapter from './components/Chapter'
import { ChapterShort } from 'api/chapters/types'
import FooterChapters from './components/FooterChapters'

const BookDetail: FC<ScreenProps<'BookDetail'>> = ({ route }) => {
  const { bookId } = route.params

  const { top } = useSafeAreaInsets()
  const MIN_HEIGHT_HEADER = HEIGHT_NIVAGATION_BAR + top
  const { data, isLoading, getData } = useBookDetailStore()
  const {
    data: chapters,
    isLoading: loadingChapters,
    getData: getChapters
  } = useChapterStore()

  const { firstChapterId, lastChapterId } = data ?? {}

  useEffect(() => {
    const fetchData = async () => {
      await getData(bookId)
      await getChapters({ bookId })
    }
    fetchData()
  }, [bookId, getChapters, getData])

  const handleRead = (chapterId: string) => {
    NavigationService.push(Route.Chapter, { chapterId })
  }

  const renderItem = ({ item }: { item: ChapterShort }) => {
    const handleChapter = (chapterId: string) => {
      NavigationService.push(Route.Chapter, { chapterId })
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

  if (isLoading) {
    return (
      <Row flex={1} justifyContent="center">
        <NavigationBar absolute />
        <ActivityIndicator size="large" />
      </Row>
    )
  }

  return (
    <View style={styles.container}>
      <Tabs.Container
        renderHeader={() => (
          <Header data={data} minHeaderHeight={MIN_HEIGHT_HEADER} />
        )}
        minHeaderHeight={MIN_HEIGHT_HEADER}>
        <Tabs.Tab name="Giới thiệu">
          <View>
            <Tabs.ScrollView contentContainerStyle={styles.introduce}>
              <Text size="l" type="content">
                {data?.description}
              </Text>
            </Tabs.ScrollView>
            <View style={styles.action}>
              {firstChapterId ? (
                <Button
                  title="Đọc từ đầu"
                  onPress={() => handleRead(firstChapterId)}
                />
              ) : null}
              {lastChapterId ? (
                <Button
                  title="Đọc mới nhất"
                  onPress={() => handleRead(lastChapterId)}
                />
              ) : null}
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
    paddingBottom: 100,
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
