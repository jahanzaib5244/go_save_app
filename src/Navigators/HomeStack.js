import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NavStrings from '../Containers/NavStrings'
import {
  Home,
  MarkerDetail,
  Requests,
  Map,
  Payments,
  GetPayments,
} from '../screens'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../Store/actions/auth.action'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Drawercontent from './DrawerContennt'
import { Colors } from '../Theme/Variables'
import { Image } from 'react-native'
import { Images } from '../Theme'
const Drawer = createDrawerNavigator()

const Stack = createStackNavigator()

const Drawernavigation = () => {
  const userdata = useSelector(state => state.AuthReducer.userData)

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

      <Drawer.Screen
        options={{
          drawerLabel: 'Requests',
          headerTitle: 'Requests',
          drawerIcon: ({ color, size }) => (
            <Image
              style={{ width: size, height: size, tintColor: color }}
              source={Images.req}
            />
          ),
        }}
        name={NavStrings.Request}
        component={Requests}
      />
      {userdata?.type === 'user' && (
        <Drawer.Screen
          options={{
            drawerLabel: 'Donation',
            headerTitle: 'Payments Mathods',
            drawerIcon: ({ color, size }) => (
              <Image
                style={{ width: size, height: size, tintColor: color }}
                source={Images.donation}
              />
            ),
          }}
          name={NavStrings.Payments}
          component={Payments}
        />
      )}
    </Drawer.Navigator>
  )
}

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={NavStrings.HomeStack}
        component={Drawernavigation}
      />
      <Stack.Screen
        name={NavStrings.MarkerDetail}
        component={MarkerDetail}
        options={{
          headerStyle: {
            backgroundColor: Colors.theme,
          },
          headerTintColor: Colors.white,
          animationEnabled: false,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={NavStrings.Map}
        component={Map}
        options={{
          headerStyle: {
            backgroundColor: Colors.theme,
          },
          headerTintColor: Colors.white,
          animationEnabled: false,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={NavStrings.Payments}
        component={Payments}
        options={{
          headerStyle: {
            backgroundColor: Colors.theme,
          },
          headerTintColor: Colors.white,
          animationEnabled: false,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={NavStrings.GetPayments}
        component={GetPayments}
        options={{
          headerStyle: {
            backgroundColor: Colors.theme,
          },
          headerTintColor: Colors.white,
          animationEnabled: false,
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
