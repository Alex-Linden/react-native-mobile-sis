import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';

import Login from './screens/Login';
import SisApi from './api';
import Home from './screens/Home';
import ItemsByType from './screens/ItemsByType';
import ItemDetail from './screens/ItemDetail';
import { COLORS } from './vocabs';
import LogoTitle from './components/LogoTitle';

const Stack = createNativeStackNavigator();

/**SIS application
 *
 * state: token
 *
 * App -> {Login, Home}
 */
export default function App() {
  const [token, setToken] = useState('');
  const [cohortItems, setCohortItems] = useState([]);

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
    fetchCohortItems();
  }

  /** Logout function set token to none */
  function logoutUser() {
    setToken(null);
    SisApi.token = null;
  }
  
  /**Calls SisApi to get all cohort items and update state  */
  async function fetchCohortItems() {
    console.log("fetchCohortItems");
    let apiCohortItems = await SisApi.getCohortItems();
    apiCohortItems = apiCohortItems.filter(i => i.status === "published");
    setCohortItems(apiCohortItems);
  };

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
            headerRight:() => <Button onPress={logoutUser}>Logout</Button>,
          }} >
          <Stack.Screen name='Home'>
            {(props) => <Home {...props} cohortItems={cohortItems} />}
          </Stack.Screen>
          <Stack.Screen name='ItemsByType'>
            {(props) => <ItemsByType {...props} cohortItems={cohortItems} />}
          </Stack.Screen>
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

