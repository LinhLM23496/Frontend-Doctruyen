import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'components'
import { avatarSize, colorRange, space } from 'themes'
import { useChapterStore } from 'stores/chapters'

type Props = {
  bookId: string
}

const FooterChapters = ({ bookId }: Props) => {
  const { paging, isLoading, getData, clear } = useChapterStore()
  const { page, totalPages } = paging ?? {}
  const previousOne = page - 1

  const renderPageButton = (pageNumber: number) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handlePage(pageNumber)}
      style={styles.box}>
      <Text textAlign="center">{pageNumber}</Text>
    </TouchableOpacity>
  )

  const renderDots = () => (
    <TouchableOpacity activeOpacity={0.8} style={styles.box}>
      <Text textAlign="center">...</Text>
    </TouchableOpacity>
  )

  const handlePage = async (pageNumber: number) => {
    if (isLoading) return
    await getData({ bookId, page: pageNumber })
  }

  return (
    <View style={styles.container}>
      {page > 2 ? renderPageButton(1) : null}
      {page > 3 ? renderDots() : null}
      {previousOne ? renderPageButton(previousOne) : null}

      <View style={[styles.box, styles.current]}>
        <Text textAlign="center">{page}</Text>
      </View>

      {page < totalPages ? renderPageButton(page + 1) : null}
      {page < totalPages - 2 ? renderDots() : null}
      {page < totalPages - 1 ? renderPageButton(totalPages) : null}
    </View>
  )
}

export default FooterChapters

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: space.m,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space.xxs
  },
  box: {
    padding: space.xs,
    backgroundColor: colorRange.danger[500],
    borderRadius: space.xs,
    width: avatarSize.xs
  },
  current: {
    backgroundColor: colorRange.primary[400]
  }
})
