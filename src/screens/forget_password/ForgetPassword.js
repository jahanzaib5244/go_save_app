import { View, Image, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import Images from '../../Theme/Images'
import AppInput from '../../Components/AppInput'
import AppButton from '../../Components/AppButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NavStrings from '../../Containers/NavStrings'

const ForgetPassword = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <View style={styles.detail_container}>
        <Image source={Images.logo} style={styles.logo} />
        <Text style={styles.title}>{'Go & Save'}</Text>
      </View>
      <View style={styles.input_container}>
        <View>
          <AppInput placeholder="Email..." icon={Images.email} />
          <View style={styles.emptyContainer} />
          <View style={styles.btn}>
            <AppButton title="Forget Password" />
          </View>
        </View>
        <View style={styles.registerContaier}>
          <Text style={styles.registerTxt}>Login with credetials </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(NavStrings.Singup)}
          >
            <Text style={styles.signup}> Login ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ForgetPassword
