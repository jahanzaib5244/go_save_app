import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './utils'

import RootNavigation from './RootNavigation'
import HomeStack from './HomeStack'
import { Splash } from '../screens'
import auth from '@react-native-firebase/auth'

// @refresh reset
const ApplicationNavigator = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(data => {
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
      {user ? <HomeStack /> : <RootNavigation />}
    </NavigationContainer>
  )
}

export default ApplicationNavigator
