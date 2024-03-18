import { StyleSheet } from 'react-native'
import React from 'react'
import { Button, Modal, Row, Text } from 'components'
import { useModal } from 'stores'
import { space } from 'themes'

const ModalGobal = () => {
  const { modal, closeModal } = useModal()
  const {
    display,
    position,
    type,
    title,
    subTitle,
    content,
    button,
    autoClose,
    onClose
  } = modal ?? {}

  const handleButton = (onPress?: () => void) => {
    closeModal()
    onPress?.()
  }

  if (!display) return null

  return (
    <Modal
      visible={display}
      setModalVisible={closeModal}
      onClose={onClose}
      position={position}
      autoClose={autoClose}
      type={type}>
      {title ? (
        <Text type="title" size="xl" fontWeight="600">
          {title}
        </Text>
      ) : null}
      {subTitle ? (
        <Text type="subTitle" size="l" fontWeight="500">
          {subTitle}
        </Text>
      ) : null}
      {content ? <Text type="content">{content}</Text> : null}
      {button?.length ? (
        <Row
          justifyContent="space-between"
          gap={space.m}
          style={styles.buttonContainer}>
          {button?.map((item, index) => (
            <Button
              key={index}
              type={type}
              onPress={() => handleButton(item?.onPress)}
              style={styles.button}>
              {item.content}
            </Button>
          ))}
        </Row>
      ) : null}
    </Modal>
  )
}

export default ModalGobal

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    marginTop: space.xl
  },
  button: {
    flex: 1,
    paddingVertical: space.xs
  }
})
