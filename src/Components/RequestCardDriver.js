import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AppButton from './AppButton'
import { Images } from '../Theme'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

const RequestCardDriver = ({ item = {} }) => {
  const all_users = useSelector(state => state.AuthReducer.all_users)
  const [user, setuser] = useState({})
  const [driver, setdriver] = useState({})

  useEffect(() => {
    all_users.map(users => {
      if (item?.requested_by === users?.uid) {
        setuser(users)
      } else if (item?.driver_uid === users?.uid) {
        setdriver(users)
      }
    })
  }, [all_users, item?.driver_uid, item?.requested_by, user.uid])

  const accepted = async () => {
    await firestore().collection('request').doc(item?.id).update({
      status: 'accepted',
    })
  }

  const rejected = async () => {
    await firestore().collection('request').doc(item?.id).update({
      status: 'rejected',
    })
  }

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={Images.avatar} style={{ height: 50, width: 50 }} />
        </View>
        <View
          style={{
            flex: 2.5,
            justifyContent: 'space-around',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.txt}>Name</Text>
            <Text style={styles.txt}>{user?.first_name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.txt}>Time</Text>
            <Text style={styles.txt}>{moment(item?.time).fromNow()}</Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              await Linking.openURL(`geo:${item.lat},${item.lon}`)
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
      {item?.status === 'pending' && (
        <View style={styles.btnCon}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: 'green' }]}>
            <Text style={styles.Bttxt} onPress={() => accepted()}>
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: 'red' }]}>
            <Text style={styles.Bttxt} onPress={() => rejected()}>
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default RequestCardDriver

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
