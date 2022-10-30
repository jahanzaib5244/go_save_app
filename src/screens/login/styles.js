import { StyleSheet } from 'react-native'

import { Colors } from '../../Theme/Variables'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  logo: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',
  },
  detail_container: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    flex: 0.7,
  },
})
