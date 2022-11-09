import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { Formik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import AppInput from '../../Components/AppInput'
import AppButton from '../../Components/AppButton'
import { Images } from '../../Theme'
import firestore from '@react-native-firebase/firestore'

const easypaisa = Yup.object().shape({
  amount: Yup.number().required(),
  phone: Yup.number().required(),
})
const card = Yup.object().shape({
  amount: Yup.number().required(),
  bank: Yup.number().required(),
  cvc: Yup.number().required(),
  card: Yup.number().required(),
})

const GetPayment = ({ route }) => {
  const type = route.params.type

  const [loadinng, setloadinng] = useState(false)

  const confirmAmount = async values => {
    try {
      setloadinng(true)
      if (type === 'easypaisa' || type === 'jazz') {
        await firestore().collection('payments').add({
          type,
          amount: values.amount,
          phone: values.phone,
        })
        setloadinng(false)
      } else {
        await firestore().collection('payments').add({
          type,
          amount: values.amount,
          bank: values.bank,
          cvc: values.cvc,
          card: values.card,
        })
        setloadinng(false)
      }
    } catch (error) {
      setloadinng(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Formik
        initialValues={{ amount: '', phone: '', card: '', cvc: '', bank: '' }}
        onSubmit={confirmAmount}
        validationSchema={
          type === 'easypaisa' || type === 'jazz' ? easypaisa : card
        }
      >
        {({
          handleSubmit,
          handleChange,
          setFieldTouched,
          touched,
          values,
          errors,
        }) => (
          <>
            <View style={{ marginTop: 20 }}>
              <AppInput
                onChange={handleChange('amount')}
                blur={() => setFieldTouched('firstName')}
                placeholder="Amount..."
                icon={Images.money}
                error={touched.amount && errors.amount}
                message={errors.amount}
                values={values.amount}
              />
              <View style={{ height: 10 }} />
              {type === 'card' && (
                <AppInput
                  onChange={handleChange('bank')}
                  blur={() => setFieldTouched('bank')}
                  placeholder="Bank Name..."
                  icon={Images.bank}
                  error={touched.bank && errors.bank}
                  message={errors.bank}
                  values={values.bank}
                />
              )}
              <View style={{ height: 10 }} />

              {type === 'jazz' || type === 'easypaisa' ? (
                <AppInput
                  onChange={handleChange('phone')}
                  blur={() => setFieldTouched('phone')}
                  placeholder="Phone..."
                  icon={Images.phone}
                  error={touched.phone && errors.phone}
                  message={errors.phone}
                  values={values.phone}
                />
              ) : null}
              <View style={{ height: 10 }} />

              {type === 'card' && (
                <AppInput
                  onChange={handleChange('card')}
                  blur={() => setFieldTouched('card')}
                  placeholder="Card Number..."
                  icon={Images.card}
                  error={touched.card && errors.card}
                  message={errors.card}
                  values={values.card}
                />
              )}
              <View style={{ height: 10 }} />

              {type === 'card' && (
                <AppInput
                  onChange={handleChange('cvc')}
                  blur={() => setFieldTouched('cvc')}
                  placeholder="cvc..."
                  icon={Images.cvc}
                  error={touched.cvc && errors.cvc}
                  message={errors.cvc}
                  values={values.cvc}
                />
              )}
              <View style={{ height: 50 }} />

              <AppButton
                title="Confirm Payment"
                onPress={handleSubmit}
                loading={loadinng}
              />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  )
}

export default GetPayment
