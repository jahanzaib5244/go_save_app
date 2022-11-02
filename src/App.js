import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import ApplicationNavigator from './Navigators/Application'
import './Translations'
import STORE from './Config/STORE'

const App = () => (
  <Provider store={STORE}>
    <ApplicationNavigator />
  </Provider>
)

export default App
