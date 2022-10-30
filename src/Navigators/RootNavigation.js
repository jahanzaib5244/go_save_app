import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NavStrings from '../Containers/NavStrings'
const Stack = createStackNavigator()

import { ForgetPassword, Login, Signup } from '../screens/index'

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={NavStrings.Login}
        component={Login}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen name={NavStrings.Singup} component={Signup} />
      <Stack.Screen
        name={NavStrings.ForgetPassword}
        component={ForgetPassword}
      />
    </Stack.Navigator>
  )
}

export default RootNavigation
