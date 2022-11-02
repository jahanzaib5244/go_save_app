import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NavStrings from '../Containers/NavStrings'
const Stack = createStackNavigator()

import { ForgetPassword, Login, Options, Signup } from '../screens/index'

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavStrings.Login}
        component={Login}
        options={{
          animationEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: `Register As ${route.params?.register}`,
          headerTitleAlign: 'center',
        })}
        name={NavStrings.Singup}
        component={Signup}
      />
      <Stack.Screen
        options={{ title: 'Forget Password', headerTitleAlign: 'center' }}
        name={NavStrings.ForgetPassword}
        component={ForgetPassword}
      />
      <Stack.Screen
        options={{ title: 'Register As', headerTitleAlign: 'center' }}
        name={NavStrings.options}
        component={Options}
      />
    </Stack.Navigator>
  )
}

export default RootNavigation
