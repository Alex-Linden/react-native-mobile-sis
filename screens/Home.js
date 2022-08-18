import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../vocabs';

import SisApi from '../api';
import List from '../components/List';

/** Home makes api call for all cohort items and loads home page
 * displays loading spinner while waiting for api call
 *
 * props:
 * -navigation
 *
 * App -> Home -> List
 */
export default function Home({ navigation }) {
  const [cohortItems, setCohortItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**Calls SisApi to get all cohort items and update state  */
  const fetchCohortItems = async () => {
    console.log("fetchCohortItems");
    let apiCohortItems = await SisApi.getCohortItems();
    apiCohortItems = apiCohortItems.filter(i => i.status === "published");
    setCohortItems(apiCohortItems);
    setIsLoading(false);
  };

  /** Calls fetchCohortItems get all cohort items when page loads*/
  useEffect(
    function fetchCohortItemsWhenMounted() {
      fetchCohortItems();
    },
    []
  );

  console.log("cohortItems", cohortItems);

  /**Shows loading page while data is being fetched from api */
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          size={200}
          color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  /** Displays list of cohort items */
  return (
    <View style={styles.container}>
      <List cohortItems={cohortItems} navigation={navigation} />
      {/* <StatusBar style="auto" /> */}
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

  image: {
    height: 200,
    resizeMode: 'contain',
  },
});
