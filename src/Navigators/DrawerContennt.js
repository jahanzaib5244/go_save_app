import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { useSelector, useDispatch } from 'react-redux'

import { Images } from '../Theme'
import { Colors } from '../Theme/Variables'
import { logoutFireStore } from '../Store/actions/auth.action'

export default function Drawercontent(props) {
  const userdata = useSelector(state => state.AuthReducer.userData)

  const dispatch = useDispatch()
  const ctaLogout = () => {
    dispatch(logoutFireStore())
  }

  return (
    <View style={styles.main_containner}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.image_containner}>
              <Image
                source={
                  userdata?.ProfilePic
                    ? { uri: userdata?.ProfilePic }
                    : Images.avatar
                }
                style={styles.userImage}
              />
            </View>
            <Text numberOfLines={1} style={styles.title}>
              {userdata?.first_name}
            </Text>
            <Text numberOfLines={1} style={styles.caption}>
              {userdata?.email}
            </Text>
            <View style={styles.border} />
          </View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View>
        <View style={styles.looutButton}>
          <TouchableOpacity onPress={ctaLogout} style={styles.paddinngVertical}>
            <View style={styles.logoutContainer}>
              <Image style={styles.logoutImage} source={Images.logout} />
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  userInfoSection: {
    paddingTop: 20,
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  image_containner: {
    alignSelf: 'center',
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 8,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: Colors.black,
    textTransform: 'capitalize',
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: Colors.black,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  border: {
    borderWidth: 0.6,
    marginTop: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 15,
    marginLeft: 10,
    color: Colors.black,
    textAlign: 'left',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    borderTopWidth: 1,
    borderColor: Colors.lightBlack,
    marginTop: 15,
    backgroundColor: Colors.primary,
  },
  logoutImage: {
    width: 22,
    height: 22,
    tintColor: Colors.black,
  },
  main_containner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddinngVertical: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  userImage: {
    height: 80,
    width: 80,
  },
  looutButton: {
    paddingVertical: 20,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: Colors.primary,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
