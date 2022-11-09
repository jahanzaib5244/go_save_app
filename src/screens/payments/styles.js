import { StyleSheet } from 'react-native'

import { Colors } from '../../Theme/Variables'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  btn: {
    height: 110,
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  image: {
    height: 80,
    width: 100,
    marginLeft: 15,
    resizeMode: 'contain',
  },
  text_cotainer: {
    flex: 1,
  },
  txt: {
    fontSize: 22,
    color: Colors.black,
    fontWeight: '700',
    marginLeft: 20,
  },
})
