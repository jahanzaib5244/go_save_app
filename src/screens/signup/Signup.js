import { View, Text } from 'react-native'
import React, { useState } from 'react'
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
  const [dbError, setdbError] = useState('')
  const [loading, setloading] = useState(false)
  const type = route.params?.register
  const handelSingup = async values => {
    setloading(true)
    const { firstName, lastName, cnic, email, password } = values
    try {
      setdbError('')
      const create = await auth().createUserWithEmailAndPassword(
        email,
        password,
      )
      console.log(create, 'crested')
      const res = await firestore().collection('users').add({
        first_name: firstName,
        last_name: lastName,
        type,
        cnic: cnic,
        dob: '',
        email,
        pic: '',
        disabled: false,
      })
      console.log(res)
      setloading(false)
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
