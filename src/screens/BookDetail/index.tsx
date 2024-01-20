import { ActivityIndicator, Button, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { NavigationService, Route, ScreenProps } from 'navigation'
import { HEIGHT_NIVAGATION_BAR, color, space } from 'themes'
import Header from './components/Header'
import { Tabs } from 'react-native-collapsible-tab-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { List, NavigationBar, Row, Text } from 'components'
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import { useBookDetailStore, useChapterStore, useHistoryStore } from 'stores'
import Chapter from './components/Chapter'
import { ChapterShort } from 'api/chapters/types'
import FooterChapters from './components/FooterChapters'
import { unitId } from 'lib'
import { useAdmob } from 'queryHook'

const BookDetail: FC<ScreenProps<'BookDetail'>> = ({ route }) => {
  const { bookId } = route.params

  const { top } = useSafeAreaInsets()
  const { handleShow } = useAdmob()
  const MIN_HEIGHT_HEADER = HEIGHT_NIVAGATION_BAR + top
  const { data, isLoading, getData } = useBookDetailStore()
  const {
    data: chapters,
    isLoading: loadingChapters,
    getData: getChapters
  } = useChapterStore()
  const { addHistory } = useHistoryStore()
  const [loading, setLoading] = useState(true)

  const { firstChapterId, lastChapterId } = data ?? {}

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await getData(bookId)
      getChapters({ bookId })
      if (res) {
        const history = {
          bookId,
          nameBook: res.name,
          cover: res.cover
        }
        addHistory(history)
      }

      setLoading(false)
    }

    fetchData()
  }, [bookId])

  const handleRead = async (chapterId: string) => {
    handleShow(unitId.INTERSTITAL, () =>
      NavigationService.push(Route.Chapter, { chapterId })
    )
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

  if (isLoading || loadingChapters || loading) {
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
              <Text size="l" type="content" style={styles.content}>
                {data?.description}
              </Text>

              <GAMBannerAd
                unitId={unitId.BANNER}
                sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
                requestOptions={{ requestNonPersonalizedAdsOnly: true }}
              />
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
    paddingBottom: 100
  },
  content: {
    padding: space.m
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
