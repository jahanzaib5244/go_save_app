import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from './Navigators/Application'
import './Translations'

const App = () => (
  <Provider store={store}>
    <ApplicationNavigator />
  </Provider>
)

export default App
