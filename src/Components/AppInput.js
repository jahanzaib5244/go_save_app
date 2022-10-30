import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../Theme/Variables'

const AppInput = ({ title = '', style, onChange = () => {} }) => {
  return (
    <View style={{ ...styles.input, ...style }}>
      <Text style={styles.title}>{title}</Text>
      <TextInput onChangeText={e => onChange(e)} />
    </View>
  )
}

export default AppInput

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'red',
    elevation: 4,
    width: '90%',
    height: 100,
  },
  title: {
    color: Colors.text,
  },
})
