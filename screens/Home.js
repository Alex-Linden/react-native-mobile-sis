import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as React from 'react';
import { ActivityIndicator, Title } from 'react-native-paper';

import List from '../components/List';
import { COLORS } from '../vocabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

/** Home makes api call for all cohort items and loads home page
 * displays loading spinner while waiting for api call
 *
 * props:
 * -navigation
 * -cohortItems: [
 * {description,
 * id,
 * staff_terse,
 * start_at,
 * start_date,
 * status,
 * title,
 * type,
 * week_group
 * }, ...]
 *
 * App -> Home -> List
 */
export default function Home({ navigation, cohortItems }) {

  console.log("cohortItems", cohortItems);

  /**Shows loading page while data is being fetched from api */
  if (cohortItems.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          size={200}
          color={COLORS.primary} />
      </SafeAreaView>
    );
  }
  
  const today = new Date();
  const upcomingItems = cohortItems.filter(i =>
    new Date(i.start_date) >= today
  );

  /** Displays list of cohort items */
  return (
    
    <View style={styles.container}>
      <Title style={styles.title}>Upcoming</Title>
      <List cohortItems={upcomingItems} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    marginHorizontal: 10,
  },
});
