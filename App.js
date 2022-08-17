import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Login from './Login';
import SisApi from './api';
import List from './List';

const TOKEN = process.env.TOKEN

export default function App() {
  const [cohortItems, setCohortItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');


  const fetchCohortItems = async () => {
    console.log("fetchCohortItems");
    const apiCohortItems = await axios.get(
      "http://localhost:8000/api/cohortitems/",
      { headers: { Authorization: `Token ${TOKEN}` } }
    );

    console.log(apiCohortItems.data);

    setCohortItems(apiCohortItems.data);
    setIsLoading(false);
  };
  
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

  /** Calls SisApi to get all lecture sessions*/
  useEffect(
    function fetchCohortItemsWhenMounted() {
      fetchCohortItems();
    },
    []
  );
  
  console.log("cohortItems", cohortItems);
  
  /** Load login page if not logged in */
  return(
    <View style={styles.loginContainer}>
      <Login loginUser={loginUser}/>
    </View>
  );

  if(isLoading){
    return (
      <SafeAreaView style={styles.loadingContainer}>
      </SafeAreaView>
    )
  }
  return (
    <View style={styles.container}>
      <List cohortItems={cohortItems}/>
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
    backgroundColor: 'rgb(228, 107, 102)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
