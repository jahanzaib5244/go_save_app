import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NavStrings from '../Containers/NavStrings'
import { Home } from '../screens'
import { useDispatch } from 'react-redux'
import { getUserData } from '../Store/actions/auth.action'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Drawercontent from './DrawerContennt'
import { Colors } from '../Theme/Variables'
import { Image } from 'react-native'
import { Images } from '../Theme'
const Drawer = createDrawerNavigator()

const Stack = createStackNavigator()

const HomeStack = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  return (
    <Drawer.Navigator
      drawerContent={props => <Drawercontent {...props} />}
      screenOptions={{
        swipeEnabled: false,
        gestureEnabled: false,
        drawerLockMode: 'locked-open',
        drawerActiveBackgroundColor: Colors.drawer,
        drawerActiveTintColor: Colors.theme,
        drawerInactiveTintColor: Colors.black,
        headerStyle: {
          backgroundColor: Colors.theme,
          elevation: 0,
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',

        drawerLabelStyle: {
          fontWeight: '600',
          marginLeft: -15,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        options={{
          drawerLabel: 'Home',
          headerTitle: 'Home',
          drawerIcon: ({ color, size }) => (
            <Image
              style={{ width: size, height: size, tintColor: color }}
              source={Images.home}
            />
          ),
        }}
        name={NavStrings.Home}
        component={Home}
      />
    </Drawer.Navigator>
  )
}

export default HomeStack
