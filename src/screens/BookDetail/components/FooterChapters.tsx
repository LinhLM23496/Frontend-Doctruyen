import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef } from 'react'
import { BottomSheetChapter, Text } from 'components'
import { avatarSize, color, colorRange, space } from 'themes'
import { useChapterStore } from 'stores'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

type Props = {
  bookId: string
}

const FooterChapters = ({ bookId }: Props) => {
  const { paging, isLoading, getData } = useChapterStore()
  const { page, totalPages } = paging ?? {}
  const previousOne = page - 1

  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  const renderPageButton = (pageNumber: number) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handlePage(pageNumber)}
      style={styles.box}>
      <Text textAlign="center">{pageNumber}</Text>
    </TouchableOpacity>
  )

  const renderDots = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => bottomSheetRef.current?.present()}
      style={styles.box}>
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
      <BottomSheetChapter
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        totalPages={totalPages}
        currentPage={page}
        onPress={handlePage}
        disabled={isLoading}
      />
    </View>
  )
}

export default FooterChapters

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space.xxs,
    marginBottom: space.m
  },
  box: {
    padding: space.xs,
    backgroundColor: colorRange.danger[500],
    borderRadius: space.xs,
    width: avatarSize.xs
  },
  current: {
    backgroundColor: colorRange.primary[400]
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    width: '30%'
  },
  bottomSheet: {
    gap: space.m,
    paddingHorizontal: space.m
  },
  bottomSheetSub: {
    justifyContent: 'space-between'
  },
  bottomSheetBG: {
    backgroundColor: color.dark
  }
})
