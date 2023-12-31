import { Button, ScrollView, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { NavigationService, ScreenProps } from 'navigation'
import { NavigationBar, Text } from 'components'
import { chaptersAPI } from 'api'
import { GetChapterReposne } from 'api/chapters/types'
import { space } from 'themes'
import Header from './components/Header'

const Chapter: FC<ScreenProps<'Chapter'>> = ({ route }) => {
  const { chapterId } = route?.params
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<GetChapterReposne>()

  const { content, numberChapter } = data ?? {}

  useEffect(() => {
    const fetchData = async () => {
      if (!chapterId) return
      try {
        setIsLoading(true)
        const res = await chaptersAPI.getChapter({ chapterId })
        setData(res)
      } catch (error) {
        NavigationService.goBack()
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [chapterId])

  if (!data || isLoading) return

  return (
    <View style={{ flex: 1 }}>
      <NavigationBar title={'chuyeen gi'} />
      <ScrollView contentContainerStyle={styles.list}>
        <Header data={data} />
        <Text size="l" style={styles.content}>
          {content}
        </Text>
      </ScrollView>
      <View style={{ marginHorizontal: space.m, marginBottom: space.m }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Chương trước" />
          <Button title={`Chương ${numberChapter}`} />
          <Button title="Chương sau" />
        </View>
      </View>
    </View>
  )
}

export default Chapter

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: space.m
  },
  content: {
    marginTop: space.m
  }
})
