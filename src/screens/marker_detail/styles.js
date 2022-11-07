import { StyleSheet } from 'react-native'

import { Colors } from '../../Theme/Variables'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  singleInfo2: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  singleInfoTxt: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    flex: 1,
  },
  singleInfoTxt2: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
    flex: 1,
  },
})
