import ReactNativeForegroundService from '@supersami/rn-foreground-service'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'

import GetLocation from 'react-native-get-location'
import firestore from '@react-native-firebase/firestore'

export const onStart = () => {
  // Checking if the task i am going to create already exist and running, which means that the foreground is also running.
  if (ReactNativeForegroundService.is_task_running('taskid')) return
  // Creating a task.
  ReactNativeForegroundService.add_task(
    async () => {
      const uid = auth().currentUser?.uid
      console.log(uid)
      const { latitude, longitude } = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
      if (uid) {
        const res = await firestore().collection('users').doc(uid).update({
          lat: latitude,
          lon: longitude,
        })
        console.log(res)
      }
    },

    {
      delay: 5000,
      onLoop: true,
      taskId: 'taskid',
      onError: e => console.log('Error logging:', e),
    },
  )

  return ReactNativeForegroundService.start({
    id: 144,
    title: 'Location Service',
    message: "please don't turn off your internet and locatio",
  })
}

export const onStop = () => {
  // Make always sure to remove the task before stoping the service. and instead of re-adding the task you can always update the task.
  if (ReactNativeForegroundService.is_task_running('taskid')) {
    ReactNativeForegroundService.remove_task('taskid')
  }
  // Stoping Foreground service.
  return ReactNativeForegroundService.stop()
}
