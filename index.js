/**
 * @format
 */
import 'react-native-gesture-handler'
import ReactNativeForegroundService from '@supersami/rn-foreground-service'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

ReactNativeForegroundService.register()
AppRegistry.registerComponent(appName, () => App)
