import { View, Linking, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps' // remove PROVIDER_GOOGLE import if not using Google Maps
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import GetLocation from 'react-native-get-location'

const Map = ({ route }) => {
  const driverUid = route.params?.uid
  const userdata = useSelector(state => state?.AuthReducer?.userData)
  const [driver, setdriver] = useState({})
  const [user, setuser] = useState({})
  const [latitide, setlatitide] = useState(null)
  const [longitude, setlongitude] = useState(null)
  const [hospitals, sethospitals] = useState([])

  useEffect(() => {
    const driverInfo = firestore()
      .collection('users')
      .doc(driverUid)
      .onSnapshot(snapshot => {
        if (snapshot?.data()?.type === 'driver') {
          setdriver(snapshot.data())
          setuser(userdata)
        } else {
          setuser(snapshot.data())
          setdriver(userdata)
        }
      })
    const get_hospitals = firestore()
      .collection('hospitals')
      .onSnapshot(snapshot => {
        const all_hospitals = []
        if (!snapshot.empty) {
          snapshot.forEach(item => {
            all_hospitals.push({ ...item.data(), uid: item.id })
          })
        }
        sethospitals(all_hospitals)
      })

    return () => {
      driverInfo()
      get_hospitals()
    }
  }, [driverUid, userdata])

  useEffect(() => {
    GetLocation.getCurrentPosition().then(loc => {
      setlatitide(loc.latitude)
      setlongitude(loc.longitude)
    })
    // eslint-disable-next-line no-trailing-spaces
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {latitide && longitude ? (
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
            latitude: latitide,
            longitude: longitude,
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
            coordinate={{ latitude: user.lat, longitude: user.lon }}
            title={`${user?.first_name}`}
            description={`${user?.email}`}
            image={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/gosave-50d38.appspot.com/o/cropped_image.png?alt=media&token=21f171a4-cb43-4f97-9727-b4624039c0bc',
            }}
          />
          {userdata?.type === 'user' && (
            <>
              {hospitals.map((item, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{ latitude: item.lat, longitude: item.lon }}
                    title={`${item?.name}`}
                    description={`${item?.phone}`}
                    onCalloutPress={() => {
                      Linking.openURL(`tel:${item?.phone}`)
                    }}
                    image={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/gosave-50d38.appspot.com/o/cropped_image%20(1).png?alt=media&token=ba968dee-9fb5-4808-bb3b-c420bf41f2eb',
                    }}
                  />
                )
              })}
            </>
          )}
        </MapView>
      ) : null}
    </View>
  )
}

export default Map
