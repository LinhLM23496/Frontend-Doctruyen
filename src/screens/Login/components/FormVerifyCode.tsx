import {
  Keyboard,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View
} from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, Input } from 'components'
import { color, colorRange, space } from 'themes'
import { Controller, useForm } from 'react-hook-form'
import { InputProps, InputRef } from 'components/Input/types'
import { validatePassword } from 'lib'
import { authsAPI } from 'api'
import { TAB_FORM } from '../contants'

type Props = {
  setTab: React.Dispatch<React.SetStateAction<number>>
  email: string
}

type LoginDataParams = {
  code: string
  email: string
  password: string
  confirmPassword: string
}

type DataInputType = InputProps & {
  ref: InputRef
  name: 'code' | 'email' | 'password' | 'confirmPassword'
  label: string
  rules?: {
    required: string
    validate?: any
  }
}

const FormVerifyCode = ({ setTab, email }: Props) => {
  const [loading, setLoading] = useState(false)

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDataParams>({ mode: 'all', defaultValues: { email } })

  const listInput: DataInputType[] = [
    {
      ref: useRef<TextInput>(null),
      name: 'email',
      label: 'Email',
      iconName: 'sms',
      editable: false
    },
    {
      ref: useRef<TextInput>(null),
      name: 'code',
      label: 'Mã xác thực',
      rules: {
        required: 'Hãy điền mã xác thực',
        validate: (v: string) => {
          if (v?.length !== 6) {
            return 'Mã xác thực phải đủ 6 số'
          }

          return true
        }
      },
      iconName: 'password-check'
    },
    {
      ref: useRef<TextInput>(null),
      name: 'password',
      label: 'Mật khẩu mới',
      rules: {
        required: 'Hãy điền mật khẩu mới',
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
      handleSubmit(onSubmit)()
    }

    const nextRef = listInput[index + 1]?.ref as React.RefObject<TextInput>

    if (nextRef && nextRef.current) {
      nextRef.current.focus()
    }
  }

  const onSubmit = async (form: LoginDataParams) => {
    try {
      Keyboard.dismiss()
      setLoading(true)
      await authsAPI.changePasswordByCode(form)
      ToastAndroid.show('Đã đổi mật khẩu thành công !', ToastAndroid.SHORT)
      setTab(TAB_FORM.LOGIN)
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
        <Button
          type="teal"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Đổi mật khẩu
        </Button>
      </View>
    </View>
  )
}

export default FormVerifyCode

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
