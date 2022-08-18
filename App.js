import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import SisApi from './api';
import Home from './Home';
import ItemDetail from './ItemDetail';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ 
        backgroundColor: "rgb(228, 107, 102)", 
        resizeMode: 'contain', 
        height: 35,
      }}
      source={require('./assets/rithm-school.png')}
    />
  );
}

export default function App() {
  const [token, setToken] = useState('');

  /** Login function makes API call
   *
   *  Takes:
   *  - form data from LoginForm
   *
   *  Sets
   *  - token
   *
   */
  async function loginUser(userData) {
    console.log('loginUser');
    const token = await SisApi.logIn(userData);
    setToken(token);
  }

  /**displays list of cohort items */
  return (
    <NavigationContainer>
      {token
        ? (<Stack.Navigator 
              initialRouteName='Home'
              screenOptions={{
                headerTitle: (props) => <LogoTitle {...props} />,
                headerStyle: {
                  backgroundColor: "rgb(228, 107, 102)",
                },
              }} >
            <Stack.Screen 
              name='Home' 
              component={Home}
            />
            <Stack.Screen 
              name='ItemDetail' 
              component={ItemDetail}
            />
          </Stack.Navigator>)
        : (<Stack.Navigator 
            initialRouteName='Login'
            screenOptions={{
              headerTitle: (props) => <LogoTitle {...props} />,
              headerStyle: {
                backgroundColor: "rgb(228, 107, 102)",
              },
            }} >
            <Stack.Screen name='Login'>
              {(props) => <Login {...props} loginUser={loginUser} />}
            </Stack.Screen>
          </Stack.Navigator>)
      }
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    height: 200,
    resizeMode: 'contain',
  },
});
