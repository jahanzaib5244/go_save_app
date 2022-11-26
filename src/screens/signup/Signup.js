import { View, Text, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from './styles'
import Images from '../../Theme/Images'
import AppInput from '../../Components/AppInput'
import AppButton from '../../Components/AppButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NavStrings from '../../Containers/NavStrings'
import { Formik } from 'formik'
import * as Yup from 'yup'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import DropDownPicker from 'react-native-dropdown-picker'
import GetLocation from 'react-native-get-location'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First Name'),
  lastName: Yup.string().required().label('Last Name'),
  cnic: Yup.string().required().label('CNIC'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password').min(6).max(10),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
})

const Signup = ({ navigation, route }) => {
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

  const [dbError, setdbError] = useState('')
  const [loading, setloading] = useState(false)

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [lat, setlat] = useState(null)
  const [lon, setlon] = useState(null)
  const [items, setItems] = useState([
    { label: 'Chippa', value: 'Chippa' },
    { label: 'Amaan', value: 'Amaan' },
    { label: 'Edhi', value: 'Edhi' },
  ])

  const gettigLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location)
        setlat(location.latitude)
        setlon(location.longitude)
      })
      .catch(error => {
        const { code, message } = error
        console.warn(code, message)
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
    console.log(checked)
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

  const type = route.params?.register
  const handelSingup = async values => {
    setloading(true)
    const { firstName, lastName, cnic, email, password } = values

    try {
      setdbError('')
      if (type === 'driver') {
        if (value && lat && lon) {
          const create = await auth().createUserWithEmailAndPassword(
            email,
            password,
          )
          const res = await firestore()
            .collection('users')
            .doc(create.user.uid)
            .set({
              first_name: firstName,
              last_name: lastName,
              type,
              cnic: cnic,
              dob: '',
              email,
              pic: '',
              disabled: false,
              ambulance: value,
              lat,
              lon,
            })
          console.log(res)
          auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'app/email-verification',
          })
          setloading(false)
        } else {
          setloading(false)
          setdbError(
            'please select an ambulance or make sure you have location enable',
          )
        }
      } else if (type === 'user') {
        if (lat && lon) {
          const create = await auth().createUserWithEmailAndPassword(
            email,
            password,
          )
          const res = await firestore()
            .collection('users')
            .doc(create.user.uid)
            .set({
              first_name: firstName,
              last_name: lastName,
              type,
              cnic: cnic,
              dob: '',
              email,
              pic: '',
              disabled: false,
              lat,
              lon,
            })
          console.log(res)
          setloading(false)
        } else {
          setloading(false)
          setdbError(
            'please select an ambulance or make sure you have location enable',
          )
        }
      }
    } catch (error) {
      console.log(error)
      setloading(false)
      setdbError(error.message)
    }
  }
  return (
    <View style={styles.root}>
      <View style={styles.input_container}>
        <View>
          {type === 'driver' && (
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={styles.dropdown}
              placeholder="Select an orgaizatio..."
            />
          )}
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              cnic: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={handelSingup}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
              values,
            }) => (
              <>
                <AppInput
                  onChange={handleChange('firstName')}
                  blur={() => setFieldTouched('firstName')}
                  placeholder="First Name..."
                  icon={Images.user}
                  error={touched.firstName && errors.firstName}
                  message={errors.firstName}
                  values={values.firstName}
                />
                <View style={styles.emptyContainer} />
                <AppInput
                  onChange={handleChange('lastName')}
                  blur={() => setFieldTouched('lastName')}
                  placeholder="Last Name..."
                  error={touched.lastName && errors.lastName}
                  message={errors.lastName}
                  icon={Images.user}
                  values={values.lastName}
                />
                <View style={styles.emptyContainer} />
                <AppInput
                  onChange={handleChange('cnic')}
                  blur={() => setFieldTouched('cnic')}
                  placeholder="CNIC..."
                  error={touched.cnic && errors.cnic}
                  message={errors.cnic}
                  icon={Images.id}
                  values={values.cnic}
                />
                <View style={styles.emptyContainer} />
                <AppInput
                  onChange={handleChange('email')}
                  blur={() => setFieldTouched('email')}
                  placeholder="Email..."
                  error={touched.email && errors.email}
                  icon={Images.email}
                  values={values.email}
                />
                <View style={styles.emptyContainer} />
                <AppInput
                  onChange={handleChange('password')}
                  blur={() => setFieldTouched('password')}
                  placeholder="Password..."
                  icon={Images.lock}
                  error={touched.password && errors.password}
                  message={errors.password}
                  values={values.password}
                  secure={true}
                />
                <View style={styles.emptyContainer} />
                <AppInput
                  onChange={handleChange('confirmPassword')}
                  blur={() => setFieldTouched('confirmPassword')}
                  values={values.confirmPassword}
                  placeholder="Confirm Password..."
                  icon={Images.lock}
                  secure={true}
                  error={touched.confirmPassword && errors.confirmPassword}
                  message={errors.confirmPassword}
                />
                <View style={styles.emptyContainer} />
                {dbError !== '' && <Text style={styles.error}>{dbError}</Text>}
                <View style={styles.btn}>
                  <AppButton
                    onPress={handleSubmit}
                    title={loading ? 'loadig' : 'Register'}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.registerContaier}>
          <Text style={styles.registerTxt}>Already have an account </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(NavStrings.Login)}
          >
            <Text style={styles.signup}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Signup
