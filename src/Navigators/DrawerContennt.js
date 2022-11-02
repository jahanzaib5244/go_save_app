import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Avatar, Title, Caption, Text } from 'react-native-paper'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { useSelector, useDispatch } from 'react-redux'
import Progress from 'react-native-progress/Pie'
import PImage from 'react-native-image-progress'

import { Colors } from '../config/Utils'
import { dologout } from '../Store/actions/AuthActions'
import strings from '../constants/language/LocalizedString'
export default function Drawercontent(props) {
  const userdata = useSelector(state => state.AuthReducer.userData)

  const dispatch = useDispatch()
  const ctaLogout = () => {
    dispatch(dologout())
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                alignSelf: 'center',
                height: 80,
                width: 80,
                borderRadius: 80 / 2,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                elevation: 8,
              }}
            >
              <PImage
                source={{ uri: userdata?.ProfilePic }}
                indicator={Progress}
                style={{ height: 80, width: 80 }}
                indicatorProps={{
                  size: 60,
                  borderWidth: 1,
                  color: 'rgba(256, 256, 256, 1)',
                  unfilledColor: 'rgba(150, 150, 150, 0.2)',
                }}
              />
            </View>
            <Title numberOfLines={1} style={styles.title}>
              {userdata?.FirstName}
            </Title>
            <Caption numberOfLines={1} style={styles.caption}>
              {userdata?.Email}
            </Caption>
            <View
              style={{
                borderWidth: 0.6,
                marginTop: 10,
                marginHorizontal: 20,
                borderColor: '#ccc',
              }}
            />
          </View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View>
        <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={ctaLogout} style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ width: 22, height: 22, tintColor: Colors.black }}
                source={require('../assets/logout.png')}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Roboto-Medium',
                  marginLeft: 10,
                  color: Colors.black,
                  textAlign: 'left',
                }}
              >
                {strings.signout}
              </Text>
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
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
