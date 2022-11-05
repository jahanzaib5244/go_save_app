import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps' // remove PROVIDER_GOOGLE import if not using Google Maps
import { WebView } from 'react-native-webview'
import { useSelector, useDispatch } from 'react-redux'
import { styles } from './styles'

const Home = () => {
  const users = useSelector(state => state?.MainReducer?.Allusers)
  const userdata = useSelector(state => state?.MainReducer?.userData)
  const [displayUser, setdisplayUser] = useState([])

  useEffect(() => {
    // dispatch(fetchAllusers())
  }, [])
  useEffect(() => {
    const filteredUsers = users?.filter(item => {
      if (userdata?.role == 'farmer' && item?.role === 'doctor') {
        return item
      } else {
        if (userdata?.role == 'dealer' && item?.role === 'farmer') {
          return item
        } else {
          if (userdata?.role == 'doctor' && item?.role === 'farmer') {
            return item
          }
        }
      }
    })
    setdisplayUser(filteredUsers)
  }, [userdata?.role, users])
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        region={{
          latitude: 31.5204,
          longitude: 74.3587,
          latitudeDelta: 0.075,
          longitudeDelta: 0.0121,
        }}
      >
        {displayUser?.map((item, index) => {
          if (item.lat !== '' && item.lon !== '') {
            return (
              <Marker
                key={index}
                coordinate={{ latitude: item.lat, longitude: item.lon }}
                title={`${item.fullname.toUpperCase()}`}
                description={`${item.address}`}
              >
                <Callout
                  tooltip={true}
                  // onPress={e =>
                  //   navigation.navigate(NavStrings.userInformation, { item })
                  // }
                >
                  <View>
                    <View style={styles.bubble}>
                      <View style={styles.textContaier}>
                        <Text
                          style={styles.name}
                        >{`${item?.fullname.toUpperCase()}`}</Text>
                        <Text style={styles.Mapadress}>{item.address}</Text>
                        <Text style={styles.Mapadress}>{item.phone}</Text>
                      </View>
                      <View style={styles.ImageWrapper}>
                        {/* <WebView
                          style={{ height: 90, width: 90 }}
                          source={{ uri: `${item.ImagePath}` }}
                        /> */}
                      </View>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </Callout>
              </Marker>
            )
          }
        })}
      </MapView>
    </View>
  )
}

export default Home
