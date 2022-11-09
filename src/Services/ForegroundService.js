import ReactNativeForegroundService from '@supersami/rn-foreground-service'
import auth from '@react-native-firebase/auth'

import firestore from '@react-native-firebase/firestore'
import Geolocation from 'react-native-geolocation-service'

export const onStart = () => {
  // Checking if the task i am going to create already exist and running, which means that the foreground is also running.
  if (ReactNativeForegroundService.is_task_running('taskid')) return
  // Creating a task.
  ReactNativeForegroundService.add_task(
    async () => {
      const uid = auth().currentUser?.uid
      if (uid) {
        Geolocation.getCurrentPosition(
          async position => {
            const { latitude, longitude } = position.coords
            await firestore().collection('users').doc(uid).update({
              lat: latitude,
              lon: longitude,
            })
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
      } else {
        onStop()
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
    message: "please don't turn off your internet and location",
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
