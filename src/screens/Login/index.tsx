import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { FC, useState } from 'react'
import { NavigationBar, ViewShadow } from 'components'
import { ScreenProps } from 'navigation'
import { images } from 'assets'
import { avatarSize, color, space } from 'themes'
import FormLogin from './components/FormLogin'
import FormRegister from './components/FormRegister'
import FormForgotPassword from './components/FormForgotPassword'
import FormVerifyCode from './components/FormVerifyCode'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TAB_FORM } from './type'

const Login: FC<ScreenProps> = () => {
  const [tab, setTab] = useState(0)
  const [email, setEmail] = useState('')

  const renderForm = () => {
    switch (tab) {
      case TAB_FORM.REGISTER:
        return <FormRegister setTab={setTab} />
      case TAB_FORM.FORGOT_PASSWORD:
        return <FormForgotPassword setTab={setTab} setEmail={setEmail} />
      case TAB_FORM.VERIFY_CODE:
        return <FormVerifyCode setTab={setTab} email={email} />
      default:
        return <FormLogin setTab={setTab} />
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView style={styles.container}>
        <NavigationBar />
        <View style={styles.containerBanner}>
          <ViewShadow borderRadius={100} style={styles.containerSubBanner}>
            <Image source={images.logo} style={styles.banner} />
          </ViewShadow>
        </View>
        <View style={styles.form}>{renderForm()}</View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerBanner: {
    alignItems: 'center',
    marginBottom: space.m
  },
  containerSubBanner: {
    padding: 0
  },
  banner: {
    height: avatarSize.xxl,
    aspectRatio: 1,
    borderRadius: 100
  },
  form: {
    height: space.height * 0.7,
    paddingHorizontal: space.m,
    backgroundColor: color.teal,
    borderTopLeftRadius: space.xl,
    borderTopRightRadius: space.xl
  }
})
