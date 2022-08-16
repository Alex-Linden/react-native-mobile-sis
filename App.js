import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect} from 'react';
import SisApi from './api';

import List from './List';

export default function App() {
  const [lectureSessions, setLecturesSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  /** Calls SisApi to get all lecture sessions*/
  useEffect(
    function fetchLectureSessionsWhenMounted() {
      async function fetchLectures() {
        const apiLectures = await SisApi.getLectureSessions();
        console.log(apiLectures);
        setLecturesSessions(apiLectures);
        setIsLoading(false);
      }
      fetchLectures();
    },
    []
  );

  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <List />
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
});
