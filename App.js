import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import AppNavigator from './Components/AppNavigator'
import Authnavigation from './Components/RootStackScreen';
import RootStackScreen from './Components/RootStackScreen';
import { AuthContext } from './Components/authContext';

const APP = () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        }
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    login: async (userToken) => {
      dispatch({ type: 'LOGIN', token: userToken })
    },
    logout: async () => {
      await AsyncStorage.removeItem('accessToken')
      dispatch({ type: 'LOGOUT' })
    }
  }))

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'LOGOUT' })
    }, 1000);
  }, [])


  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>

      <NavigationContainer >
        {loginState.userToken != null ? (

          <AppNavigator />
        ) :
          <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
export default APP;