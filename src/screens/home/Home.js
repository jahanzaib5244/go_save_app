import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps' // remove PROVIDER_GOOGLE import if not using Google Maps
import { useSelector, useDispatch } from 'react-redux'
import { styles } from './styles'
import DropDownPicker from 'react-native-dropdown-picker'
import GetLocation from 'react-native-get-location'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions'
import { getAllUsers } from '../../Store/actions/auth.action'
import NavStrings from '../../Containers/NavStrings'
import { onStart } from '../../Services/ForegroundService'
import ReactNativeForegroundService from '@supersami/rn-foreground-service'
import { Colors } from '../../Theme/Variables'

const Home = ({ navigation }) => {
  const users = useSelector(state => state.AuthReducer.all_users)
  const dispatch = useDispatch()
  const userdata = useSelector(state => state?.AuthReducer?.userData)
  const [displayUser, setdisplayUser] = useState([])
  const [items, setItems] = useState([
    { label: 'Chippa', value: 'Chippa' },
    { label: 'Amaan', value: 'Amaan' },
    { label: 'Edhi', value: 'Edhi' },
  ])
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)

  useEffect(() => {
    dispatch(getAllUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const filteredUsers = users?.filter(item => {
      const { lat, lon, type } = item
      if (lat && lon && type === 'driver') {
        return item
      }
    })
    setdisplayUser(filteredUsers)
    setTimeout(() => {
      if (!ReactNativeForegroundService.is_task_running('taskid')) {
        onStart()
      }
    }, 10000)
  }, [userdata, users])

  const gettigLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setlat(location.latitude)
        setlon(location.longitude)
      })
      .catch(error => {
        gettigLocation()
      })
  }

  const requestLocation = async () => {
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    const granted = await permission_check()
    if (granted) {
      gettigLocation()
    }
  }

  const getLocationFunn = async () => {
    const checked = await permission_check()
    if (checked) {
      gettigLocation()
    } else {
      requestLocation()
    }
  }

  useEffect(() => {
    getLocationFunn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const filteredUsers = users?.filter(item => {
      const { lat, lon, ambulance, type } = item
      if (lat && lon && type === 'driver') {
        if (value) {
          if (ambulance === value) {
            return item
          }
        } else {
          return item
        }
      }
    })
    setdisplayUser(filteredUsers)
  }, [users, value])

  const permission_check = async (status = false) => {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

    switch (result) {
      case RESULTS.UNAVAILABLE:
        status = false
        console.log(
          'This feature is not available (on this device / in this context)',
        )
        break
      case RESULTS.DENIED:
        status = false

        console.log(
          'The permission has not been requested / is denied but requestable',
        )
        break
      case RESULTS.LIMITED:
        status = false

        console.log('The permission is limited: some actions are possible')
        break
      case RESULTS.GRANTED:
        status = true
        console.log('The permission is granted')
        break
      case RESULTS.BLOCKED:
        status = false

        console.log('The permission is denied and not requestable anymore')
        break
    }
    return status
  }
  const [lat, setlat] = useState(null)
  const [lon, setlon] = useState(null)

  return (
    <View style={{ flex: 1 }}>
      {lat && lon ? (
        <View style={{ flex: 1 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFill}
            pitchEnabled={true}
            showsCompass={true}
            liteMode={false}
            showsBuildings={true}
            showsTraffic={true}
            showsIndoors={true}
            region={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.25,
              longitudeDelta: 0.0121,
            }}
          >
            {displayUser?.map((item, index) => {
              const { last_name, first_name } = item
              if ((item.lat, item.lon)) {
                return (
                  <Marker
                    key={index}
                    coordinate={{ latitude: item.lat, longitude: item.lon }}
                    title={`${item?.ambulance}`}
                    description={`${item?.email}`}
                    onCalloutPress={() => {
                      if (userdata?.type === 'user') {
                        navigation.navigate(NavStrings.MarkerDetail, {
                          item,
                          lat,
                          lon,
                        })
                      }
                    }}
                    image={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/musafir-49f4d.appspot.com/o/1834905_100x100.png?alt=media&token=ee8b3167-9371-43e8-ae2b-b3fbfcc654b9',
                    }}
                  />
                )
              }
            })}
          </MapView>
          {userdata?.type === 'user' && (
            <View
              style={{
                height: 50,
                width: '90%',
                top: 20,
                alignSelf: 'center',
                flexDirection: 'row',
              }}
            >
              <View style={{ flex: 1 }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  // style={{ width: '70%', backgroundColor: 'green' }}
                  placeholder="Select an organization..."
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: 'black', fontSize: 18 }}>
            Map Could't Show it may case your location is not enable
          </Text>
        </View>
      )}
    </View>
  )
}

export default Home
