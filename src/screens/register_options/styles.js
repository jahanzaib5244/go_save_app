import { StyleSheet } from 'react-native'
import { Colors } from '../../Theme/Variables'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    alignSelf: 'center',
    top: 15,
    color: Colors.black,
    fontWeight: '700',
    fontSize: 18,
  },
  justify: {
    justifyContent: 'space-around',
    flex: 1,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  iconHeading: {
    fontSize: 18,
    color: Colors.text,
    top: 10,
    fontWeight: '700',
  },
})
