import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import Login from './screens/Login';
import SisApi from './api';
import { COLORS } from './vocabs';
import LogoTitle from './components/LogoTitle';
import {
  HomeStackScreen,
  LecturesStackScreen,
  ExercisesStackScreen,
  AssessmentsStackScreen,
  EventsStackScreen
} from './components/StackNavs';

const LoginStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


/**SIS application
 *
 * state: token
 *
 * App -> {
 *  Login, 
 *  HomeStackScreen, 
 *  LecturesStackScreen, 
 *  ExercisesStackScreen, 
 *  AssessmentsStackScreen, 
 *  EventsStackScreen 
 * }
 */
export default function () {
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

  function renderMainApp() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
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

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })} >
        <Tab.Screen name='Home'>
          {(props) => <HomeStackScreen {...props}
            cohortItems={cohortItems}
            logoutUser={logoutUser} />}
        </Tab.Screen>
        <Tab.Screen name='Lectures'>
          {(props) => <LecturesStackScreen {...props}
            cohortItems={cohortItems}
            logoutUser={logoutUser}
          />}
        </Tab.Screen>
        <Tab.Screen name='Exercises'>
          {(props) => <ExercisesStackScreen {...props}
            cohortItems={cohortItems}
            logoutUser={logoutUser}
          />}
        </Tab.Screen>
        <Tab.Screen name='Assessments'>
          {(props) => <AssessmentsStackScreen {...props}
            cohortItems={cohortItems}
            logoutUser={logoutUser}
          />}
        </Tab.Screen>
        <Tab.Screen name='Events'>
          {(props) => <EventsStackScreen {...props}
            cohortItems={cohortItems}
            logoutUser={logoutUser}
          />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  function renderLoginScreen() {
    return (
      <LoginStack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }} >
        <LoginStack.Screen name='Login'>
          {(props) => <Login {...props} loginUser={loginUser} />}
        </LoginStack.Screen>
      </LoginStack.Navigator>
    );
  }

  /** If user is logged in, displays main app, else displays login screen */
  return (
    <NavigationContainer>
      {token
        ? renderMainApp()
        : renderLoginScreen()
      }
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  forgot_button: {
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 8,
    fontSize: 20,
    color: '#ffffff'
  },

});