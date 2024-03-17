import {
  Keyboard,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View
} from 'react-native'
import React, { useRef, useState } from 'react'
import { ButtonShadow, Input, Text } from 'components'
import { color, colorRange, space } from 'themes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { InputProps, InputRef } from 'components/Input/types'
import { validateEmailInput, validatePassword, validateUserName } from 'lib'
import { authsAPI } from 'api'
import { NavigationService } from 'navigation'
import { TAB_FORM } from '../contants'
import { useAuth } from 'hook'

type Props = {
  setTab: React.Dispatch<React.SetStateAction<number>>
}

type LoginDataParams = {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

type DataInputType = InputProps & {
  ref: InputRef
  name: 'displayName' | 'email' | 'password' | 'confirmPassword'
  label: string
  rules: {
    required: string
    validate?: any
  }
}

const FormLogin = ({ setTab }: Props) => {
  const { bottom } = useSafeAreaInsets()
  const { onLogin } = useAuth.useLogin({
    onSuccess: () => {
      NavigationService.goBack()
    }
  })

  const [loading, setLoading] = useState(false)

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDataParams>({ mode: 'all' })

  const listInput: DataInputType[] = [
    {
      ref: useRef<TextInput>(null),
      name: 'displayName',
      label: 'Tên hiển thị',
      rules: {
        required: 'Hãy điền tên của bạn',
        validate: validateUserName()
      },
      iconName: 'pet'
    },
    {
      ref: useRef<TextInput>(null),
      name: 'email',
      label: 'Email',
      rules: {
        required: 'Hãy điền email',
        validate: validateEmailInput()
      },
      iconName: 'sms'
    },
    {
      ref: useRef<TextInput>(null),
      name: 'password',
      label: 'Mật khẩu',
      rules: {
        required: 'Hãy điền mật khẩu',
        validate: validatePassword()
      },
      iconName: 'lock',
      secureTextEntry: true
    },
    {
      ref: useRef<TextInput>(null),
      name: 'confirmPassword',
      label: 'Xác nhận mật khẩu',
      rules: {
        required: 'Hãy điền mật khẩu',
        validate: (v: string) => {
          if (v !== watch('password')) {
            return 'Xác nhận mật khẩu không khớp'
          }
          return true
        }
      },
      iconName: 'lock',
      secureTextEntry: true
    }
  ]

  const handleReturnKey = (index: number) => {
    if (index >= listInput.length - 1) {
      Keyboard.dismiss()
    }

    const nextRef = listInput[index + 1]?.ref as React.RefObject<TextInput>

    if (nextRef && nextRef.current) {
      nextRef.current.focus()
    }
  }

  const onSubmit = async (form: LoginDataParams) => {
    try {
      setLoading(true)
      const data = {
        ...form,
        displayName: form.displayName.trim(),
        email: form.email.toLowerCase().trim()
      }

      await authsAPI.register(data)
      await onLogin(data)
    } catch (error: any) {
      ToastAndroid.show(error?.message, ToastAndroid.SHORT)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          {listInput.map(({ name, rules, ...rest }, index) => (
            <Controller
              key={index}
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
                  labelStyle={styles.label}
                  iconColor={colorRange.teal[700]}
                />
              )}
            />
          ))}
        </View>
        <ButtonShadow
          type="teal"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Đăng ký
        </ButtonShadow>
      </View>
      <Text
        textAlign="center"
        color={color.black}
        style={{ marginBottom: bottom + space.m }}>
        Đã có tài khoản?{' '}
        <Text
          fontWeight="bold"
          color={color.primary}
          onPress={() => setTab(TAB_FORM.LOGIN)}>
          Đăng nhập
        </Text>
      </Text>
    </View>
  )
}

export default FormLogin

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  form: {
    gap: space.xs,
    paddingTop: space.m
  },
  button: {
    marginTop: space.xl,
    marginVertical: space.s
  },
  label: {
    color: color.black
  }
})
