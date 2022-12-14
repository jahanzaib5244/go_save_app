import { View, Image, Text } from 'react-native'
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

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

const Login = ({ navigation }) => {
  const [loading, setloading] = useState(false)
  const [dberror, setdberror] = useState('')

  const handelLogin = async values => {
    setdberror('')
    setloading(true)
    const { email, password } = values
    try {
      await auth().signInWithEmailAndPassword(email, password)
      setloading(false)
    } catch (error) {
      console.log(error)
      setloading(false)
      setdberror(error?.message)
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.detail_container}>
        <Image source={Images.logo} style={styles.logo} />
        <Text style={styles.title}>{'Go & Save'}</Text>
      </View>
      <View style={styles.input_container}>
        <View>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handelLogin}
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
                  onChange={handleChange('email')}
                  blur={e => setFieldTouched('email')}
                  placeholder="Email..."
                  icon={Images.email}
                  error={errors.email && touched.email}
                  message={errors.email}
                  values={values.email}
                />
                <View style={styles.emptyContainer} />
                <AppInput
                  placeholder="Password..."
                  icon={Images.lock}
                  secure={true}
                  onChange={handleChange('password')}
                  blur={e => setFieldTouched('password')}
                  error={errors.password && touched.password}
                  message={errors.password}
                  values={values.password}
                />

                <TouchableOpacity
                  onPress={() => navigation.navigate(NavStrings.ForgetPassword)}
                  style={styles.forgetPassword}
                >
                  <Text style={styles.signup}>Forget Password ?</Text>
                </TouchableOpacity>
                {dberror !== '' && <Text style={styles.error}>{dberror}</Text>}
                <View style={styles.btn}>
                  <AppButton
                    loading={loading}
                    title="Login"
                    onPress={handleSubmit}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.registerContaier}>
          <Text style={styles.registerTxt}>Don't have an account </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(NavStrings.options)}
          >
            <Text style={styles.signup}>Register ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login
