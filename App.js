import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import SisApi from './api';

import List from './List';
import axios from 'axios';

// const TOKEN = "d3cb0e452955cfd4f81f2d4fccbade5e3b4753ee";
const TOKEN = "d3fe9dffb6eed5297aa0cedbf6f052db4d958735";

export default function App() {
  const [lectureSessions, setLecturesSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchLectures = async () => {
    console.log("fetchLectures");
    const apiLectures = await axios.get(
      "http://localhost:8000/api/lecturesessions/",
      { headers: { Authorization: `Token ${TOKEN}` } })
    ;
    // SisApi.getLectureSessions();
    console.log(apiLectures.data);
    const lecturesP = apiLectures.data.results.map(l => axios.get(l.api_url,
      { headers: { Authorization: `Token ${TOKEN}` } })
    );
    let lectures = await new Promise.all(lecturesP);
    lectures = lectures.map(l => l.data);
    
    setLecturesSessions(lectures);
    setIsLoading(false);
  };

  /** Calls SisApi to get all lecture sessions*/
  useEffect(
    function fetchLectureSessionsWhenMounted() {
      // async function fetchLectures() {
      //   const apiLectures = await SisApi.getLectureSessions();
      //   console.log(apiLectures.data);
      //   setLecturesSessions(apiLectures.data);
      //   setIsLoading(false);
      // }
      fetchLectures();
    },
    []
  );
  console.log("lectureSessions", lectureSessions);

  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <List lectures={lectureSessions}/>
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
