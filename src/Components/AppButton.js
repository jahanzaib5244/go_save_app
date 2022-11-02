import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../Theme/Variables'

const AppButton = ({ style = {}, title = '', onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.button, ...style }}>
      <Text style={styles.buttonTxt}>{title}</Text>
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
