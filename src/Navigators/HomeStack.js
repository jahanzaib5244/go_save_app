import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NavStrings from '../Containers/NavStrings'
import { Home } from '../screens'
import { useDispatch } from 'react-redux'
import { getUserData } from '../Store/actions/auth.action'
import { createDrawerNavigator } from '@react-navigation/drawer'
const Drawer = createDrawerNavigator()

const Stack = createStackNavigator()

const HomeStack = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  return (
    <Drawer.Navigator>
      <Drawer.Screen name={NavStrings.Home} component={Home} />
    </Drawer.Navigator>
  )
}

export default HomeStack
