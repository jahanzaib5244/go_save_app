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
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    flex: 0.7,
    justifyContent: 'space-between',
  },
  emptyContainer: {
    height: 10,
  },
  btn: {
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.theme,
    top: 5,
  },
  registerTxt: {
    color: Colors.black,
    fontSize: 14,
  },
  registerContaier: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
  },
  signup: {
    color: Colors.theme,
    fontWeight: '700',
  },
  forgetPassword: {
    marginLeft: '7%',
    marginVertical: 20,
  },
})
