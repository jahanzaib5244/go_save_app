import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Images } from '../Theme'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import moment from 'moment'
import NavStrings from '../Containers/NavStrings'

const RequestCardUser = ({ item = {} }) => {
  const all_users = useSelector(state => state.AuthReducer.all_users)
  const [user, setuser] = useState({})
  const [driver, setdriver] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    all_users.map(users => {
      if (item?.requested_by === users?.uid) {
        setuser(users)
      } else if (item?.driver_uid === users?.uid) {
        setdriver(users)
      }
    })
  }, [all_users, item?.driver_uid, item?.requested_by, user.uid])

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={Images.driver} style={{ height: 50, width: 50 }} />
        </View>
        <View
          style={{
            flex: 2.5,
            justifyContent: 'space-around',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.txt}>Name</Text>
            <Text style={styles.txt}>{driver?.first_name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.txt}>Time</Text>
            <Text style={styles.txt}>{moment(item?.time).fromNow()}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (item?.status === 'pending' || item?.status === 'rejected') {
                return
              } else {
                navigation.navigate(NavStrings.Map, { uid: item?.requested_by })
              }
            }}
            style={{ flexDirection: 'row' }}
          >
            <Text style={styles.txt}>Adress</Text>
            <Text style={styles.txt}>Open Map</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.txt}>Status</Text>
            <Text style={styles.txt}>{item?.status}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default RequestCardUser

const styles = StyleSheet.create({
  card: {
    // height: 100,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 10,
    elevation: 10,
  },
  btn: {
    height: 30,
    backgroundColor: 'red',
    width: '30%',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Bttxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txt: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    textTransform: 'capitalize',
  },
})
