import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './utils'

import RootNavigation from './RootNavigation'
import HomeStack from './HomeStack'
import { Splash } from '../screens'
// @refresh reset
const ApplicationNavigator = () => {
  const [user, setuser] = useState({})
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setuser({})
    setloading(false)
  }, [])

  return loading ? (
    <Splash />
  ) : (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      {user ? <RootNavigation /> : <HomeStack />}
    </NavigationContainer>
  )
}

export default ApplicationNavigator
