import { StyleSheet, TextInput, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { Button, Input, NavigationBar } from 'components'
import { colorRange, space } from 'themes'
import { Controller, useForm } from 'react-hook-form'
import { InputProps, InputRef } from 'components/Input/types'
import { validateNameBook } from 'lib'
import { Keyboard } from 'react-native'
import { NavigationService, ScreenProps } from 'navigation'
import { usersAPI } from 'api'
import { useNotifycation } from 'stores'
import { NotifycationType } from 'stores/notifycation/types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type DataParams = {
  name: string
  author?: string
  url?: string
  description?: string
}

type DataInputType = InputProps & {
  ref: InputRef
  name: 'name' | 'author' | 'url' | 'description'
  label: string
  maxHeight?: number
  rules?: {
    required: string
    validate?: any
  }
}

const SuggestedBook: FC<ScreenProps> = () => {
  const { setNotifycation } = useNotifycation()
  const [loading, setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<DataParams>({ mode: 'all' })

  const listInput: DataInputType[] = [
    {
      ref: useRef<TextInput>(null),
      name: 'name',
      label: 'Tên truyện *',
      rules: {
        required: 'Hãy điền tên truyện',
        validate: validateNameBook()
      },
      iconName: 'book'
    },
    {
      ref: useRef<TextInput>(null),
      name: 'author',
      label: 'Tác giả',
      iconName: 'user',
      maxLength: 50
    },
    {
      ref: useRef<TextInput>(null),
      name: 'url',
      label: 'Link truyện',
      iconName: 'link-2',
      maxLength: 100
    },
    {
      ref: useRef<TextInput>(null),
      name: 'description',
      label: 'Mô tả',
      iconName: 'message-text-1',
      multiline: true,
      maxLength: 500,
      maxHeight: 200
    }
  ]

  const handleNoti = (props: Omit<NotifycationType, 'display'>) => {
    setNotifycation({
      display: true,
      position: 'center',
      ...props
    })
  }

  const handleReturnKey = (index: number) => {
    if (index >= listInput.length - 1) {
      handleSubmit(onSubmit)()
    }

    const nextRef = listInput[index + 1]?.ref as React.RefObject<TextInput>

    if (nextRef && nextRef.current) {
      nextRef.current.focus()
    }
  }

  const onSubmit = async (form: DataParams) => {
    Keyboard.dismiss()
    try {
      setLoading(true)
      const res = await usersAPI.createSuggested({ type: 'book', ...form })
      handleNoti({
        subTitle: res,
        type: 'success',
        button: [{ content: 'Đóng' }]
      })
      NavigationService.goBack()
    } catch (error: any) {
      handleNoti({
        subTitle: error.message,
        type: 'error',
        button: [{ content: 'Đóng' }]
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAwareScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraHeight={70}
      style={styles.container}>
      <NavigationBar title="Truyện muốn đọc" />
      <View style={styles.content}>
        <View style={styles.form}>
          {listInput.map(({ name, rules, ...rest }, index) => (
            <Controller
              key={name}
              name={name}
              control={control}
              rules={rules}
              render={({ field: { onChange, value } }) => (
                <Input
                  {...rest}
                  value={value}
                  onChangeText={onChange}
                  returnKeyType={
                    index === listInput.length - 1 ? 'done' : 'next'
                  }
                  onSubmitEditing={() => handleReturnKey(index)}
                  notice={errors?.[name]?.message}
                  iconColor={colorRange.teal[700]}
                />
              )}
            />
          ))}
        </View>
        <Button
          loading={loading}
          type="teal"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Tôi thích truyện này
        </Button>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default SuggestedBook

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    marginHorizontal: space.m
  },
  form: {
    gap: space.xs,
    paddingTop: space.m
  },
  button: {
    marginTop: space.xl,
    marginVertical: space.s,
    paddingVertical: space.xs
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingVertical: space.s,
    marginVertical: -space.s
  }
})
