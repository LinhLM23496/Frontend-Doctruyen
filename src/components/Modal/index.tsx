import Icon from 'components/Icon'
import React, { useEffect, useMemo } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { StyleSheet, View, Modal as ModalRN } from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { useThemeStore } from 'stores'
import { color, space } from 'themes'
import { PositionModal } from './types'
import { TypeButtonType } from 'components/Button/types'
import ProgressBar from './components/ProgressBar'

type Props = {
  visible: boolean
  setModalVisible: (value: boolean) => void
  onClose?: () => void
  children?: React.ReactNode
  position?: PositionModal
  duration?: number
  type?: TypeButtonType
  autoClose?: boolean
}

type PositionType = {
  justifyContent: 'flex-start' | 'center' | 'flex-end'
  value: number
}

const Modal = (props: Props) => {
  const {
    visible,
    setModalVisible,
    onClose,
    children,
    position = 'center',
    type = 'info',
    duration = 750,
    autoClose = false
  } = props
  const { theme } = useThemeStore()
  const overlayValue = useSharedValue('rgba(0,0,0,0)')

  const positionValue: PositionType = useMemo(() => {
    switch (position) {
      case 'top':
        return { justifyContent: 'flex-start', value: -400 }
      case 'bottom':
        return { justifyContent: 'flex-end', value: 400 }
      default:
        return { justifyContent: 'center', value: 0 }
    }
  }, [position])

  const visibleValue = useSharedValue(positionValue.value)

  useEffect(() => {
    visibleValue.value = interpolate(
      visible ? 1 : 0,
      [0, 1],
      [positionValue.value, positionValue.value === 0 ? 1 : 0]
    )
    overlayValue.value = interpolateColor(
      visible ? 1 : 0,
      [0, 1],
      ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']
    )
  }, [visible])

  const modalStyle = useAnimatedStyle(() => {
    if (position === 'center') {
      return {
        transform: [{ scale: withSpring(visibleValue.value) }]
      }
    }
    const translateY = withSpring(visibleValue.value, { duration: 2000 })
    return { transform: [{ translateY }] }
  })

  const overlayStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(overlayValue.value, { duration })
    }
  })

  const handleClose = () => {
    setModalVisible(false)
    onClose?.()
  }
  return (
    <ModalRN
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View style={[styles.modalOverlay, overlayStyle]} />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.container,
          { justifyContent: positionValue.justifyContent }
        ]}>
        <Animated.View
          style={[
            styles.modalView,
            { backgroundColor: theme === 'dark' ? color.dark : color.white },
            modalStyle
          ]}>
          <TouchableOpacity onPress={handleClose} style={styles.buttonClose}>
            <Icon
              name="close-circle"
              color={
                type === 'error'
                  ? color.danger
                  : type === 'warning'
                  ? color.warning
                  : color.black
              }
              style={styles.close}
            />
          </TouchableOpacity>

          {children}
          {autoClose ? (
            <ProgressBar onDone={handleClose} style={styles.progressBar} />
          ) : null}
        </Animated.View>
      </View>
    </ModalRN>
  )
}

export default Modal

const styles = StyleSheet.create({
  modalOverlay: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: space.xl
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: '100%',
    borderRadius: space.m,
    padding: space.xl,
    alignItems: 'center'
  },
  close: {
    margin: space.s
  },
  buttonClose: {
    position: 'absolute',
    top: -space.s / 3,
    right: -space.s / 3
  },
  modalText: {
    textAlign: 'center'
  },
  progressBar: {
    position: 'absolute',
    bottom: 0
  }
})
