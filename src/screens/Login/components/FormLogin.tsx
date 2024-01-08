import { StyleSheet, TextInput, View } from 'react-native'
import React, { useRef } from 'react'
import { Button, Input, Text } from 'components'
import { color, colorRange, space } from 'themes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { InputProps, InputRef } from 'components/Input/types'
import { validateEmailInput } from 'lib'
import { NavigationService } from 'navigation'
import { Keyboard } from 'react-native'
import { useAuth } from 'queryHook'
import { TAB_FORM } from '../contants'

type Props = {
  setTab: React.Dispatch<React.SetStateAction<number>>
}

type LoginDataParams = {
  email: string
  password: string
}

type DataInputType = InputProps & {
  ref: InputRef
  name: 'email' | 'password'
  label: string
  rules: {
    required: string
    validate?: any
  }
}

const FormLogin = ({ setTab }: Props) => {
  const { bottom } = useSafeAreaInsets()
  const { isLoading, onLogin } = useAuth.useLogin({
    onSuccess: () => {
      NavigationService.goBack()
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDataParams>({ mode: 'all' })

  const listInput: DataInputType[] = [
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
        required: 'Hãy điền mật khẩu'
      },
      iconName: 'lock',
      secureTextEntry: true
    }
  ]

  const handleReturnKey = (index: number) => {
    if (index >= listInput.length - 1) {
      handleSubmit(onSubmit)()
    }

    const nextRef = listInput[index + 1]?.ref as React.RefObject<TextInput>

    if (nextRef && nextRef.current) {
      nextRef.current.focus()
    }
  }

  const onSubmit = (form: LoginDataParams) => {
    Keyboard.dismiss()
    onLogin(form)
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
          <Text
            color={color.black}
            fontWeight="500"
            textAlign="right"
            onPress={() => setTab(TAB_FORM.FORGOT_PASSWORD)}
            style={styles.forgotPassword}>
            Quên mật khẩu ?
          </Text>
        </View>
        <Button
          loading={isLoading}
          type="teal"
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Đăng nhập
        </Button>
      </View>
      <Text
        textAlign="center"
        color={color.black}
        style={{ marginBottom: bottom + space.m }}>
        Chưa có tài khoản?{' '}
        <Text
          fontWeight="bold"
          color={color.primary}
          onPress={() => setTab(TAB_FORM.REGISTER)}>
          Đăng ký
        </Text>
      </Text>
    </View>
  )
}

export default FormLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: space.m,
    backgroundColor: color.teal,
    borderTopLeftRadius: space.xl,
    borderTopRightRadius: space.xl
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
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingVertical: space.s,
    marginVertical: -space.s
  }
})
