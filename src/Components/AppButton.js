import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import { Colors } from '../Theme/Variables'

const AppButton = ({
  style = {},
  title = '',
  onPress = () => {},
  loading = false,
}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={{ ...styles.button, ...style }}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} size={20} />
      ) : (
        <Text style={styles.buttonTxt}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

export default AppButton

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.theme,
    height: 55,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonTxt: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
})
