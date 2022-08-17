import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Login from './Login';
import SisApi from './api';
import List from './List';

const TOKEN = "d3cb0e452955cfd4f81f2d4fccbade5e3b4753ee"; //Alex
// const TOKEN = "d3fe9dffb6eed5297aa0cedbf6f052db4d958735"; //Elise

export default function App() {
  const [cohortItems, setCohortItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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

  /** Calls SisApi to get all lecture sessions*/
  useEffect(
    function fetchCohortItemsWhenMounted() {
      fetchCohortItems();
    },
    []
  );
  console.log("cohortItems", cohortItems);
  return(
    <View style={styles.loginContainer}>
      <Login />
    </View>
  );

  if(isLoading){
    return (
      <View>
        <Image
        // style={styles.tinyLogo}
        source={ require('./assets/rithm-simple.svg')
        }
      />
      </View>
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
});
