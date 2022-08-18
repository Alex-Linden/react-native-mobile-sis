import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Card, Title, Content, Paragraph, Avatar } from 'react-native-paper';

import SisApi from "./api";

/**Displays detailed information for one item in a cohort
 *
 * props:
 *  cohort item:
 * {description,
 * id,
 * staff_terse,
 * start_at,
 * start_date,
 * status,
 * title,
 * type,
 * week_group}
 *
 * Card -> ItemDetail
 */
export default function ItemDetail({ route, navigation }) {
  const { session } = route.params;
  const [staffInfo, setStaffInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log('ItemDetail', session);


  /**Calls SisApi to get all cohort items  */
  async function fetchStaffInfo() {
    console.log("fetchStaffInfo");
    const apiStaffInfo = [];
    for (let staff of session.staff_ids) {
      apiStaffInfo.push(await SisApi.getStaffInfo(staff));
    }

    console.log('apiStaffInfo', apiStaffInfo);
    return apiStaffInfo;
  }

  /** Calls SisApi to get staff info*/
  useEffect(
    function fetchStaffInfoOnMount() {
      async function getStaffInfo(){
        const apiStaffInfo = await fetchStaffInfo();
        setStaffInfo(apiStaffInfo);
        setIsLoading(false);
      }
        
      getStaffInfo();
    },
    []
  );

  const startDate = new Date(session.start_at)
    .toLocaleDateString(undefined,
      {
        weekday: 'short',
        month: 'numeric',
        day: "numeric",
      }
    );
  const startTime = new Date(session.start_at)
    .toLocaleTimeString([],
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  // const itemType = TYPES[session.type];
  /** Show loading icon on first render */
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Image style={styles.image}
          source={require("./assets/loading.jpeg")} />
      </SafeAreaView>
    );
  }
  
  return (
    <Card>
      <Card.Title
        title={session.title}
        subtitle={`${startDate} ${startTime}`}
        titleStyle={[styles.cardTitle]}
      />
      <Card.Content>
        <Paragraph>{session.description}</Paragraph>
        <View style={styles.staffImages}>
        {staffInfo.map(s => 
          <Avatar.Image size={70} source={{ uri: s.photo }} style={styles.staffIcon}/>
        )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardCell: {
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#00449e',
  },
  cardType: {
    color: '#666',
    size: '0.875em',
  },
  staffImages: {
    flexDirection: 'row',
  },
  staffIcon: {
    // backgroundColor: '#fff',
    margin: 10,
  }
  
});