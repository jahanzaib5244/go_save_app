/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { Images } from '../../Theme'
import AppButton from '../../Components/AppButton'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { logoutFireStore } from '../../Store/actions/auth.action'

export default function Verify() {
  useEffect(() => {
    const checkingVerified = setInterval(async () => {
      try {
        await auth().currentUser.reload()
      } catch (error) {
        console.log(error)
      }
    }, 3000)

    return () => {
      clearInterval(checkingVerified)
    }
  }, [])

  const dispatch = useDispatch()
  return (
    <View style={styles.root}>
      <Text
        style={{
          fontSize: 16,
          color: 'grey',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Account Verify
      </Text>
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <View
          style={{ alignItems: 'center', marginTop: 70, paddingHorizontal: 30 }}
        >
          <Image source={Images.verify} />
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 20,
            }}
          >
            Email Verification
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 15,
              marginTop: 8,
            }}
          >
            We send an email Verification Link {auth().currentUser.email}.Click
            on Lik to verify and sign in to app
          </Text>
        </View>
        <View style={{ bottom: 100 }}>
          <AppButton
            onPress={() => dispatch(logoutFireStore())}
            title="Verified Successfully"
          />
          <View style={{ height: 15 }} />
          <AppButton
            title="Send Link Again"
            onPress={() => {
              try {
                auth().currentUser.sendEmailVerification()
                ToastAndroid.show('Verification Email send', 5000)
              } catch (error) {
                ToastAndroid.show(error.message, 5000)
              }
            }}
          />
          <View style={{ height: 15 }} />
          <AppButton
            onPress={() => dispatch(logoutFireStore())}
            title="Use Another Account"
          />
        </View>
      </View>
    </View>
  )
}
