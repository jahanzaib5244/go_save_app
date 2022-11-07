import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps' // remove PROVIDER_GOOGLE import if not using Google Maps
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'

const Map = ({ route }) => {
  const driverUid = route.params?.uid
  const lat = route.params?.lat
  const lon = route.params?.lon
  const [driver, setdriver] = useState({})
  const userdata = useSelector(state => state?.AuthReducer?.userData)

  useEffect(() => {
    const driverInfo = firestore()
      .collection('users')
      .doc(driverUid)
      .onSnapshot(snapshot => {
        setdriver(snapshot.data())
      })

    return () => {
      driverInfo()
    }
  }, [driverUid])

  return (
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
        <Marker
          coordinate={{ latitude: driver.lat, longitude: driver.lon }}
          title={`${driver?.ambulance}`}
          description={`${driver?.email}`}
          image={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/musafir-49f4d.appspot.com/o/1834905_100x100.png?alt=media&token=ee8b3167-9371-43e8-ae2b-b3fbfcc654b9',
          }}
        />
        <Marker
          coordinate={{ latitude: userdata.lat, longitude: userdata.lon }}
          title={`${userdata?.first_name}`}
          description={`${userdata?.email}`}
          image={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/musafir-49f4d.appspot.com/o/1834905_100x100.png?alt=media&token=ee8b3167-9371-43e8-ae2b-b3fbfcc654b9',
          }}
        />
      </MapView>
    </View>
  )
}

export default Map
