import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import ItemDetail from '../screens/ItemDetail';
import { COLORS } from '../vocabs';
import LogoTitle from './LogoTitle';
import ItemsByType from '../screens/ItemsByType';

const HomeStack = createNativeStackNavigator();
const LecturesStack = createNativeStackNavigator();
const ExercisesStack = createNativeStackNavigator();
const AssessmentsStack = createNativeStackNavigator();
const EventsStack = createNativeStackNavigator();

/**Renders navigation components for Home Screen
 *
 * App -> HomeStackScreen -> {Home, ItemDetail}
*/
function HomeStackScreen({ cohortItems, logoutUser }) {
  return (
    <HomeStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerRight: () => <TouchableOpacity onPress={logoutUser}>
          <Ionicons name={'log-out-outline'} size={25} color={'#fff'} />
        </TouchableOpacity>,
      }} >
      <HomeStack.Screen name='Home'>
        {(props) => <Home {...props} cohortItems={cohortItems} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name='ItemDetail'
        component={ItemDetail}
      />
    </HomeStack.Navigator>
  );
}

/**Renders navigation components for Lectures Screen
 *
 * App -> LecturesStackScreen -> {ItemsByType, ItemDetail}
*/
function LecturesStackScreen({ cohortItems, logoutUser }) {
  return (
    <LecturesStack.Navigator
      initialRouteName='LecturesS'
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerRight: () => <TouchableOpacity onPress={logoutUser}>
          <Ionicons name={'log-out-outline'} size={25} color={'#fff'} />
        </TouchableOpacity>,
      }} >
      <LecturesStack.Screen name='LecturesS'>
        {(props) => <ItemsByType {...props}
          cohortItems={cohortItems}
          itemType='L' />}
      </LecturesStack.Screen>
      <LecturesStack.Screen
        name='ItemDetail'
        component={ItemDetail}
      />
    </LecturesStack.Navigator>
  );
}

/**Renders navigation components for Exercises Screen
 *
 * App -> ExercisesStackScreen -> {ItemsByType, ItemDetail}
*/
function ExercisesStackScreen({ cohortItems, logoutUser }) {
  return (
    <ExercisesStack.Navigator
      initialRouteName='ExercisesS'
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerRight: () => <TouchableOpacity onPress={logoutUser}>
          <Ionicons name={'log-out-outline'} size={25} color={'#fff'} />
        </TouchableOpacity>,
      }} >
      <ExercisesStack.Screen name='ExercisesS'>
        {(props) => <ItemsByType {...props}
          cohortItems={cohortItems}
          itemType='E' />}
      </ExercisesStack.Screen>
      <ExercisesStack.Screen
        name='ItemDetail'
        component={ItemDetail}
      />
    </ExercisesStack.Navigator>
  );
}

/**Renders navigation components for Assessments Screen
 *
 * App -> AssessmentsStackScreen -> {ItemsByType, ItemDetail}
*/
function AssessmentsStackScreen({ cohortItems, logoutUser }) {
  return (
    <AssessmentsStack.Navigator
      initialRouteName='AssessmentsS'
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerRight: () => <TouchableOpacity onPress={logoutUser}>
          <Ionicons name={'log-out-outline'} size={25} color={'#fff'} />
        </TouchableOpacity>,
      }} >
      <AssessmentsStack.Screen name='AssessmentsS'>
        {(props) => <ItemsByType {...props}
          cohortItems={cohortItems}
          itemType='A' />}
      </AssessmentsStack.Screen>
      <AssessmentsStack.Screen
        name='ItemDetail'
        component={ItemDetail}
      />
    </AssessmentsStack.Navigator>
  );
}

/**Renders navigation components for Events Screen
 *
 * App -> EventsStackScreen -> {ItemsByType, ItemDetail}
*/
function EventsStackScreen({ cohortItems, logoutUser }) {
  return (
    <EventsStack.Navigator
      initialRouteName='EventsS'
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerRight: () => <TouchableOpacity onPress={logoutUser}>
          <Ionicons name={'log-out-outline'} size={25} color={'#fff'} />
        </TouchableOpacity>,
      }} >
      <EventsStack.Screen name='EventsS'>
        {(props) => <ItemsByType {...props}
          cohortItems={cohortItems}
          itemType='V' />}
      </EventsStack.Screen>
      <EventsStack.Screen
        name='ItemDetail'
        component={ItemDetail}
      />
    </EventsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  forgot_button: {
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 20,
    color: '#ffffff'
  },

});

export { HomeStackScreen, LecturesStackScreen, ExercisesStackScreen, AssessmentsStackScreen, EventsStackScreen };