import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Button, DefaultTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import Login from './screens/Login';
import SisApi from './api';
import Home from './screens/Home';
import ItemsByType from './screens/ItemsByType';
import ItemDetail from './screens/ItemDetail';
import { COLORS } from './vocabs';
import LogoTitle from './components/LogoTitle';
import StackNav from './components/StackNav';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// function StackNav({ cohortItems, logoutUser }) {
//   return (
//     <Stack.Navigator
//       initialRouteName='Home'
//       screenOptions={{
//         headerTitle: (props) => <LogoTitle {...props} />,
//         headerTintColor: '#ffffff',
//         headerStyle: {
//           backgroundColor: COLORS.primary,
//         },
//         headerRight: () => <Button onPress={logoutUser}>Logout</Button>,
//       }} >
//       <Stack.Screen name='Home'>
//         {(props) => <Home {...props} cohortItems={cohortItems} />}
//       </Stack.Screen>
//       <Stack.Screen
//         name='ItemDetail'
//         component={ItemDetail}
//       />
//     </Stack.Navigator>
//   );
// }

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
        ? (<Tab.Navigator
          initialRouteName='Home'
          screenOptions={({ route }) => ({
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.mediumGrey,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Lectures') {
                iconName = focused ? 'megaphone' : 'megaphone-outline';
              } else if (route.name === 'Exercises') {
                iconName = focused ? 'barbell' : 'barbell-outline';
              } else if (route.name === 'Assessments') {
                iconName = focused ? 'newspaper' : 'newspaper-outline';
              } else if (route.name === 'Events') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerRight: () => <TouchableOpacity onPress={logoutUser}>
              <Text style={styles.forgot_button}>Logout</Text>
            </TouchableOpacity>
            // <Button onPress={logoutUser} >Logout</Button>,
          })} >
          <Tab.Screen name='Home' options={{ headerShown: false }}>
            {(props) => <StackNav {...props}
              cohortItems={cohortItems}
              logoutUser={logoutUser} />}
          </Tab.Screen>
          <Tab.Screen name='Lectures'>
            {(props) => <ItemsByType {...props}
              cohortItems={cohortItems}
              itemType='L' />}
          </Tab.Screen>
          <Tab.Screen name='Exercises'>
            {(props) => <ItemsByType {...props}
              cohortItems={cohortItems}
              itemType='E' />}
          </Tab.Screen>
          <Tab.Screen name='Assessments'>
            {(props) => <ItemsByType {...props}
              cohortItems={cohortItems}
              itemType='A' />}
          </Tab.Screen>
          <Tab.Screen name='Events'>
            {(props) => <ItemsByType {...props}
              cohortItems={cohortItems}
              itemType='V' />}
          </Tab.Screen>
        </Tab.Navigator>
        )
        : (<Tab.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }} >
          <Tab.Screen name='Login'>
            {(props) => <Login {...props} loginUser={loginUser} />}
          </Tab.Screen>
        </Tab.Navigator>
        )
      }
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  forgot_button: {
    height: 30,
    justifyContent: 'center',
    alignContent:'center',
    marginRight: 8,
    fontSize: 20,
    color: '#ffffff'
  },

});