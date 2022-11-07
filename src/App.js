import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import ApplicationNavigator from './Navigators/Application'
import './Translations'
import STORE from './Config/STORE'
import { StatusBar } from 'react-native'
import { Colors } from './Theme/Variables'

const App = () => (
  <Provider store={STORE}>
    <StatusBar backgroundColor={Colors.theme} StatusBarStyle="'default'" />
    <ApplicationNavigator />
  </Provider>
)

export default App
