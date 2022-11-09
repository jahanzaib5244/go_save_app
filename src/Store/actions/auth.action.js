import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { onStop } from '../../Services/ForegroundService'
import { ALL_REQUEST, ALL_USERS, LOGIN, LOGOUT, USERDATA } from '../states'

export const getUserData = () => async dispatch => {
  try {
    const uid = auth().currentUser.uid
    console.log(uid)
    firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(async snapshot => {
        if (snapshot.data()) {
          dispatch({
            type: USERDATA,
            payload: snapshot.data(),
          })
        }
      })
  } catch (error) {
    console.log(error)
  } finally {
  }
}

export const logoutFireStore = tokens => async dispatch => {
  try {
    onStop()
    await auth().signOut()
    dispatch({
      type: LOGOUT,
      payload: {},
    })
  } catch (error) {
    console.log('logout action error', error)
  }
}

export const getAllUsers = () => async dispatch => {
  firestore()
    .collection('users')
    .onSnapshot(snapshot => {
      const users = []
      if (!snapshot.empty) {
        snapshot.forEach(documents => {
          users.push({ ...documents.data(), uid: documents.id })
        })
      }
      dispatch({
        type: ALL_USERS,
        payload: users,
      })
    })
}

export const getAllRequest = () => async dispatch => {
  firestore()
    .collection('request')
    .onSnapshot(snapshot => {
      const requests = []
      if (!snapshot.empty) {
        snapshot.forEach(documents => {
          requests.push({ ...documents.data(), id: documents.id })
        })
      }
      dispatch({
        type: ALL_REQUEST,
        payload: requests,
      })
    })
}

// export const updateProfileFirestore =
//   (
//     setloading,
//     registerAs,
//     name,
//     gender,
//     age,
//     facebookLink,
//     instagramLink,
//     CNIC,
//     city,
//     imgpath,
//     uploadingImg,
//     phoneStatus,
//     email,
//     occupation,
//     setshowAlert,
//     area,
//   ) =>
//   async dispatch => {
//     try {
//       setloading(true)
//       const uid = await AsyncStorage.getItem('uid')
//       var photo = imgpath
//       if (uploadingImg) {
//         const path = storage().ref(`/profiles/${uid}.png`)
//         await path.putFile(imgpath)
//         photo = await path.getDownloadURL()
//       }
//       const res = await firestore().collection('users').doc(uid).update({
//         registerAs,
//         name,
//         gender,
//         age,
//         facebookLink,
//         instagramLink,
//         CNIC,
//         city,
//         area,
//         photo,
//         phoneStatus,
//         email,
//         occupation,
//       })
//       setshowAlert(true)
//     } catch (error) {
//       console.log('UpdateProfile Api error>>>', error)
//     } finally {
//       setloading(false)
//     }
//   }
