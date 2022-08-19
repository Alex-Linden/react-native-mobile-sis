import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import Home from '../screens/Home';
import ItemDetail from '../screens/ItemDetail';
import { COLORS } from '../vocabs';
import LogoTitle from './LogoTitle';

const Stack = createNativeStackNavigator();

/**Renders navigation components hidden in tab bar
 *
 * App -> StackNav -> {Home, ItemDetail}
*/
function StackNav({ cohortItems, logoutUser }) {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerRight: () => <TouchableOpacity onPress={logoutUser}>
        <Text style={styles.forgot_button}>Logout</Text>
      </TouchableOpacity>,
      }} >
      <Stack.Screen name='Home'>
        {(props) => <Home {...props} cohortItems={cohortItems} />}
      </Stack.Screen>
      <Stack.Screen
        name='ItemDetail'
        component={ItemDetail}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  forgot_button: {
    height: 30,
    justifyContent: 'center',
    alignContent:'center',
    fontSize: 20,
    color: '#ffffff'
  },

});

export default StackNav;