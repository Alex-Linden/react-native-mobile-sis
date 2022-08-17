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

export default function App() {
  // const [cohortItems, setCohortItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');


  // const fetchCohortItems = async () => {
  //   console.log("fetchCohortItems");
  //   const apiCohortItems = await SisApi.getCohortItems();
  //   setCohortItems(apiCohortItems);
  //   setIsLoading(false);
  // };

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

  // /** Calls SisApi to get all lecture sessions*/
  // useEffect(
  //   function fetchCohortItemsWhenMounted() {
  //     if (token) fetchCohortItems();
  //   },
  //   [token]
  // );

  // console.log("cohortItems", cohortItems);

  // /** Load login page if not logged in */
  // if (!token) {
  //   return (
  //     <NavigationContainer>
  //       <View style={styles.loginContainer}>
  //         <Login loginUser={loginUser} />
  //       </View>
  //     </NavigationContainer>
  //   );
  // }

  /**displays list of cohort items */
  return (
    <NavigationContainer>
      {token
        ? (<Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='ItemDetail' component={ItemDetail} />
          </Stack.Navigator>)
        : (<Stack.Navigator initialRouteName='Login'>
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
