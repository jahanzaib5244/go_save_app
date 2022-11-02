import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Images } from '../../Theme'
import NavStrigs from '../../Containers/NavStrings'

const Options = ({ navigation }) => {
  return (
    <View style={styles.root}>
      {/* <Text style={styles.title}>Register As </Text> */}
      <View style={styles.justify}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NavStrigs.Singup, { register: 'user' })
          }
          style={styles.iconContainer}
        >
          <Image style={styles.icon} source={Images.avatar} />
          <Text style={styles.iconHeading}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NavStrigs.Singup, { register: 'driver' })
          }
          style={styles.iconContainer}
        >
          <Image style={styles.icon} source={Images.driver} />
          <Text style={styles.iconHeading}>Driver</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Options
