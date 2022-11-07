import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRequest } from '../../Store/actions/auth.action'
import auth from '@react-native-firebase/auth'
import RequestCardUser from '../../Components/RequestCardUser'
import RequestCardDriver from '../../Components/RequestCardDriver'

const Requests = () => {
  const all_requests = useSelector(state => state.AuthReducer.all_requests)
  const userdata = useSelector(state => state.AuthReducer.userData)
  const [requests, setrequests] = useState([])

  console.log(all_requests)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRequest())
  }, [dispatch])

  useEffect(() => {
    const uid = auth().currentUser.uid
    if (userdata?.type === 'user') {
      setrequests(
        all_requests.filter(item => {
          console.log(uid === item.requested_by, uid, item.requested_by)
          if (uid === item.requested_by) {
            return item
          }
        }),
      )
    } else if (userdata?.type === 'driver') {
      setrequests(
        all_requests.filter(item => {
          if (uid === item.driver_uid) {
            return item
          }
        }),
      )
    }
  }, [all_requests, userdata?.type])
  console.log(requests.length)
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={requests}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: 'black', fontSize: 16 }}>
              No Data Available
            </Text>
          </View>
        )}
        renderItem={({ item, index }) => {
          if (userdata?.type === 'user') {
            return <RequestCardUser item={item} />
          } else {
            return <RequestCardDriver item={item} />
          }
        }}
      />
    </View>
  )
}

export default Requests
