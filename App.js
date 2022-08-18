import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import SisApi from './api';
import Home from './Home';
import ItemDetail from './ItemDetail';
import { COLORS } from './vocabs';
import LogoTitle from './LogoTitle';

const Stack = createNativeStackNavigator();

/**SIS application
 *
 * state: token
 *
 * App -> {Login, Home}
 */
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
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: COLORS.primary,
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
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: COLORS.primary,
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

