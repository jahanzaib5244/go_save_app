import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NavStrings from '../Containers/NavStrings'
import { Home } from '../screens'
const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={NavStrings.Home}
        component={Home}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
