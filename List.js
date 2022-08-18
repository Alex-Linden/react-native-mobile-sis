import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  Divider,
  ItemSeparatorComponent
} from 'react-native';
import { DataTable } from 'react-native-paper';
// import BootstrapStyleSheet from 'react-native-bootstrap-styles';
// import 'react-native-tableview';

import Card from "./Card";

// TODO: Not using bootstrap right now

// const
//   BODY_COLOR = '#000022',
//   TEXT_PRIMARY = '#882288';

// // custom constants
// const constants = {
//   BODY_COLOR, TEXT_PRIMARY,
// };

// // custom classes
// const classes = {
//   title: {
//     color: 'red',
//   }
// };
// const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
// const { styles: s, constants: c } = bootstrapStyleSheet;

/**
 * 
 * props:
 * - cohortItems like [{
 * }, ...]
 * - navigation
 * 
 * Home -> List -> Card
 */

export default function List({ cohortItems, navigation }) {

  function renderItem({ item }) {
    return (
      <View >
        <Card style={[styles.card]} session={item} navigation={navigation} />
      </View>
    );
  }

  function itemDivider() {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#aaa",
        }}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container]}>

      <View style={[styles.listHeader]}>
        <Text style={[styles.listCell]}>Date</Text>
        <Text style={[styles.listCell]}>Start Time</Text>
        <Text style={[styles.listCellTitle]}>Title</Text>
      </View>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#444",
        }}
      />
      <FlatList
        data={cohortItems}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}-${item.type}`}
        ItemSeparatorComponent={itemDivider}
      />

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  listCell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  listCellTitle: {
    flex: 2,
    padding: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});