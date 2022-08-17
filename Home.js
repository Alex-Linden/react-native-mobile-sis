import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SisApi from './api';
import List from './List';


export default function Home({ navigation }) {
  const [cohortItems, setCohortItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**Calls SisApi to get all cohort items  */
  const fetchCohortItems = async () => {
    console.log("fetchCohortItems");
    const apiCohortItems = await SisApi.getCohortItems();
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

  /**Shows loading image while data is being fetched from api */
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Image style={styles.image}
          source={require("./assets/loading.jpeg")} />
      </SafeAreaView>
    );
  }
  /**displays list of cohort items */
  return (
    <View style={styles.container}>
      <List cohortItems={cohortItems} navigation={navigation} />
      <StatusBar style="auto" />
    </View>
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
