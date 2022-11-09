import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'
import Images from '../../Theme/Images'
import NavStrings from '../../Containers/NavStrings'

const Payments = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavStrings.GetPayments, { type: 'easypaisa' })
        }
        style={styles.btn}
      >
        <View style={styles.image_container}>
          <Image style={styles.image} source={Images.easypaisa} />
        </View>
        <View style={styles.text_cotainer}>
          <Text style={styles.txt}>EasyPaisa</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavStrings.GetPayments, { type: 'jazz' })
        }
        style={styles.btn}
      >
        <View style={styles.image_container}>
          <Image style={styles.image} source={Images.jazz} />
        </View>
        <View style={styles.text_cotainer}>
          <Text style={styles.txt}>Jazz Cash</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavStrings.GetPayments, { type: 'card' })
        }
        style={styles.btn}
      >
        <View style={styles.image_container}>
          <Image style={styles.image} source={Images.card} />
        </View>
        <View style={styles.text_cotainer}>
          <Text style={styles.txt}>Credit Card</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Payments
