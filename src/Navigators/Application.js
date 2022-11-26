import React, { useState, useEffect } from 'react'
import { StatusBar, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './utils'

import RootNavigation from './RootNavigation'
import HomeStack from './HomeStack'
import { Splash } from '../screens'
import auth from '@react-native-firebase/auth'
import Verify from '../screens/verify/Verify'

// @refresh reset
const ApplicationNavigator = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(data => {
      console.log('state chaged', data)
      setUser(data)
      if (initializing) {
        setInitializing(false)
      }
    })
    return subscriber // unsubscribe on unmount
  }, [initializing])

  return initializing ? (
    <Splash />
  ) : (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      {user ? (
        auth().currentUser.emailVerified ? (
          <HomeStack />
        ) : (
          <Verify />
        )
      ) : (
        <RootNavigation />
      )}
    </NavigationContainer>
  )
}

export default ApplicationNavigator
