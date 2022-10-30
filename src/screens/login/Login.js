import { View, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import Images from '../../Theme/Images'
import AppInput from '../../Components/AppInput'

const Login = () => {
  console.log('log in screen is showig ')
  return (
    <View style={styles.root}>
      <View style={styles.detail_container}>
        <Image source={Images.logo} style={styles.logo} />
      </View>
      <View style={styles.input_container}>
        <AppInput />
      </View>
    </View>
  )
}

export default Login
