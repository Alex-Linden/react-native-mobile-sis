import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as React from 'react';
import { ActivityIndicator, Title } from 'react-native-paper';
import { COLORS } from '../vocabs';

import SisApi from '../api';
import List from '../components/List';
import { TYPES } from '../vocabs';

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
 * params:
 * - itemType: one of TYPES
 * 
 * App -> Home -> List
 */
export default function ItemsByType({ navigation, cohortItems, itemType }) {
  // const { itemType } = route.params;
  
  console.log('ItemsByType', itemType);
  
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
  const items = cohortItems.filter(i =>
    i.type === itemType
  );

  /** Displays list of cohort items */
  return (
    <View style={styles.container}>
      <Title style={styles.title}>{TYPES[itemType]}s</Title>
      <List cohortItems={items} navigation={navigation} />
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
