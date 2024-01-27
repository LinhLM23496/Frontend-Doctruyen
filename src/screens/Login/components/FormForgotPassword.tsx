import { Keyboard, StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { ButtonShadow, Input, Text } from 'components'
import { color, colorRange, space } from 'themes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { validateEmailInput } from 'lib'
import { authsAPI } from 'api'
import { TAB_FORM } from '../contants'
import { useNotifycation } from 'stores'

type Props = {
  setTab: React.Dispatch<React.SetStateAction<number>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

type LoginDataParams = {
  email: string
}

const FormLogin = ({ setTab, setEmail }: Props) => {
  const { bottom } = useSafeAreaInsets()
  const { setNotifycation } = useNotifycation()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDataParams>({ mode: 'all' })

  const onSubmit = async (data: LoginDataParams) => {
    try {
      Keyboard.dismiss()
      setLoading(true)
      const res = await authsAPI.forgotPassword(data)
      setNotifycation({
        display: true,
        content: res,
        type: 'success',
        position: 'top'
      })
      // ToastAndroid.show(res, ToastAndroid.LONG)
      setEmail(data.email)
      setTab(TAB_FORM.VERIFY_CODE)
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
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Hãy điền email',
              validate: validateEmailInput()
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                value={value}
                onChangeText={onChange}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                notice={errors?.email?.message}
                iconName="sms"
                labelStyle={styles.label}
                iconColor={colorRange.teal[700]}
              />
            )}
          />
        </View>
        <ButtonShadow
          type="teal"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}>
          Quên mật khẩu
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
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingVertical: space.s,
    marginVertical: -space.s
  }
})
