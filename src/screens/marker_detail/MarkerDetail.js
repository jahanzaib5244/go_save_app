import { View, Text, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import AppButton from '../../Components/AppButton'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const MarkerDetail = ({ route, navigation }) => {
  const item = route.params?.item
  const lat = route.params?.lat
  const lon = route.params?.lon
  const [loading, setloading] = useState(false)
  console.log({ lat, lon })

  const sendRequest = async () => {
    try {
      setloading(true)
      await firestore().collection('request').add({
        requested_by: auth().currentUser.uid,
        status: 'pending',
        lat,
        lon,
        driver_uid: item?.uid,
        time: new Date(),
      })
      ToastAndroid.show('Your request send to Driver', 5000)
      setloading(false)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.singleInfo2}>
        <Text allowFontScaling={false} style={styles.singleInfoTxt}>
          First Name
        </Text>
        <Text allowFontScaling={false} style={styles.singleInfoTxt2}>
          {item?.first_name}
        </Text>
      </View>
      <View style={styles.singleInfo2}>
        <Text allowFontScaling={false} style={styles.singleInfoTxt}>
          Last Name
        </Text>
        <Text allowFontScaling={false} style={styles.singleInfoTxt2}>
          {item?.last_name}
        </Text>
      </View>
      <View style={styles.singleInfo2}>
        <Text allowFontScaling={false} style={styles.singleInfoTxt}>
          Email
        </Text>
        <Text allowFontScaling={false} style={styles.singleInfoTxt2}>
          {item?.email}
        </Text>
      </View>
      <View style={styles.singleInfo2}>
        <Text allowFontScaling={false} style={styles.singleInfoTxt}>
          Phone
        </Text>
        <Text allowFontScaling={false} style={styles.singleInfoTxt2}>
          {item?.phone}
        </Text>
      </View>
      <View style={styles.singleInfo2}>
        <Text allowFontScaling={false} style={styles.singleInfoTxt}>
          Ambulance
        </Text>
        <Text allowFontScaling={false} style={styles.singleInfoTxt2}>
          {item?.ambulance}
        </Text>
      </View>
      <View style={{ height: 50 }} />
      <AppButton
        onPress={() => sendRequest()}
        title="Send Request"
        loading={loading}
      />
    </View>
  )
}

export default MarkerDetail
