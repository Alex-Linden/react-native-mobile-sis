import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
export default function ItemDetail() {

  // const startDate = new Date(cohortItem.start_at)
  //   .toLocaleDateString(undefined,
  //     {
  //       weekday: 'short',
  //       month: 'numeric',
  //       day: "numeric",
  //     }
  //   );
  // const startTime = new Date(cohortItem.start_at)
  //   .toLocaleTimeString([],
  //     {
  //       hour: '2-digit',
  //       minute:'2-digit',
  //     }
  //   );
  // const itemType = TYPES[cohortItem.type];

  return (
    <View style={[styles.cardContainer]}>
      <View style={[styles.cardCell]}>
        <Text>Wed 7/11</Text>
      </View>
      <View style={[styles.cardCell]}>
        <Text>9:30am</Text>
      </View>
      <View style={[styles.cardCell]}>
        <Text style={[styles.cardTitle]}>Title</Text>
        <Text style={[styles.cardType]}>lecture</Text>
      </View>
    </View>
  );
}