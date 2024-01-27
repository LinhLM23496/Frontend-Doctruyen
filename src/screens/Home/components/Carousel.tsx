import { Animated, FlatList, Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Row, Text } from 'components'
import { avatarSize, color, colorRange, space } from 'themes'
import { images } from 'assets'
import { useThemeStore } from 'stores'

type SlideType = {
  id: number
  title: string
  image: any
  content: string
}

const slides: SlideType[] = [
  {
    id: 0,
    title: 'Slide 1',
    image: images.character_1,
    content: 'Đăng nhập để gợi ý truyện muốn đọc nè!!!'
  },
  {
    id: 1,
    title: 'Slide 2',
    image: images.character_2,
    content: 'Muốn có thêm truyện hay nữa thì đăng nhập nha!!!'
  },
  {
    id: 2,
    title: 'Slide 3',
    image: images.character_3,
    content: 'Thêm chức năng gì? Gợi ý cho chúng tôi nhé!!!'
  }
]

const Carousel = () => {
  const { theme } = useThemeStore()
  const slidesRef = useRef<FlatList>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === slides.length - 1) {
        slidesRef.current?.scrollToIndex({
          index: 0,
          animated: true
        })
      } else {
        slidesRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true
        })
      }
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [currentIndex])

  const getItemLayout = (_: any, index: number) => ({
    length: space.width,
    offset: space.width * index,
    index
  })

  const onScroll = (event: any) => {
    const positionX = event.nativeEvent.contentOffset.x
    const index = Math.round(positionX / space.width)
    setCurrentIndex(index)
  }

  const renderDots = () => {
    return slides.map((_, i) => {
      return (
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: currentIndex === i ? 'blue' : 'red'
            }
          ]}
        />
      )
    })
  }

  const renderItem = ({ item }: { item: SlideType }) => {
    return (
      <View key={item.id} style={styles.item}>
        <Row
          flex={1}
          gap={space.s}
          justifyContent="center"
          alignItems="center"
          style={{
            backgroundColor:
              theme === 'dark' ? color.dark : colorRange.gray[100],
            borderRadius: space.s,
            padding: space.s
          }}>
          <Image source={item.image} style={styles.charactor} />
          <Text size="l" fontWeight="500" style={styles.content}>
            {item.content}
          </Text>
        </Row>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={slidesRef}
        data={slides}
        renderItem={renderItem}
        // scrollEnabled={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        onScroll={onScroll}
        getItemLayout={getItemLayout}
      />
      {/* Pagination */}
      <Row justifyContent="center" gap={space.xxs}>
        {renderDots()}
      </Row>
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
  container: {
    gap: space.xxs
  },
  item: {
    width: space.width,
    paddingHorizontal: space.s
  },
  dot: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: space.xs,
    aspectRatio: 1,
    borderRadius: 100
  },
  charactor: {
    width: avatarSize.l,
    aspectRatio: 1
  },
  content: {
    flex: 1
  }
})
