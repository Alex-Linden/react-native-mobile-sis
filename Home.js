import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SisApi from './api';
import List from './List';

/** Home
 * 
 * props:
 * -navigation
 * 
 * App -> Home -> List
 */
export default function Home({ navigation }) {
  const [cohortItems, setCohortItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**Calls SisApi to get all cohort items  */
  const fetchCohortItems = async () => {
    console.log("fetchCohortItems");
    let apiCohortItems = await SisApi.getCohortItems();
    apiCohortItems = apiCohortItems.filter(i => i.status === "published");
    setCohortItems(apiCohortItems);
    setIsLoading(false);
  };

  /** Calls SisApi to get all lecture sessions*/
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
          color={"rgb(228, 107, 102)"} />
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
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
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
