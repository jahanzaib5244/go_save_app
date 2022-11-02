import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../Theme/Variables'
import Images from '../Theme/Images'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AppInput = ({
  title = 'hellos',
  icon = '',
  style,
  secure = false,
  onChange = () => {},
  placeholder = '',
  error = false,
  blur = () => {},
  message = 'error message',
  values = '',
  ...other
}) => {
  const [hide, sethide] = useState(true)
  return (
    <View>
      <View style={{ ...styles.input, ...style }}>
        <View style={styles.iconContainer}>
          <Image
            source={icon}
            style={[
              styles.icon,
              { tintColor: error ? Colors.error : Colors.black },
            ]}
          />
        </View>
        <TextInput
          secureTextEntry={hide && secure}
          {...other}
          autoCapitalize="none"
          style={[
            styles.TextInput,
            {
              color: error ? Colors.error : Colors.black,
            },
          ]}
          onChangeText={onChange}
          onBlur={e => blur(e)}
          placeholder={placeholder}
          placeholderTextColor={error ? Colors.error : 'rgba(0,0,0,0.5)'}
          value={values}
        />
        {secure && (
          <TouchableOpacity
            onPress={() => sethide(!hide)}
            style={styles.iconContainer}
          >
            {hide ? (
              <Image
                source={Images.show}
                style={[
                  styles.icon,
                  { tintColor: error ? Colors.error : Colors.black },
                ]}
              />
            ) : (
              <Image
                source={Images.hide}
                style={[
                  styles.icon,
                  { tintColor: error ? Colors.error : Colors.black },
                ]}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{message}</Text>}
    </View>
  )
}

export default AppInput

const styles = StyleSheet.create({
  input: {
    elevation: 4,
    flexDirection: 'row',
    marginHorizontal: '5%',
    paddingVertical: 5,
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  iconContainer: {
    color: Colors.black,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.black,
    height: 23,
    width: 23,
  },
  TextInput: {
    flex: 1,
    fontSize: 15,
    padding: 0,
    paddingLeft: 5,
  },
  error: {
    marginHorizontal: '8%',
    marginTop: 5,
    color: Colors.error,
  },
})
