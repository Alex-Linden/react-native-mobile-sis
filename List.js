import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop : StatusBar.currentHeight || 0,
  },
  listHeader: {
    flexDirection: 'row',
    padding: 10,
  },
  listCell: {
    padding: 10,
  },
  card: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});

// TODO: Not using bootstrap right now
// const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
// const { styles: s, constants: c } = bootstrapStyleSheet;

export default function List({cohortItems}) {

    function renderItem({item}){
      return (
        <View >
          <Card style={[styles.card]} session={item} />
        </View>
      )
    }

    return (
      <SafeAreaView style={[styles.container]}>
        <View style={[styles.listHeader]}>
          <Text style={[styles.listCell]}>Date</Text>
          <Text style={[styles.listCell]}>Start Time</Text>
          <Text style={[styles.listCell]}>Title</Text>
        </View>
        <FlatList
          data={cohortItems}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}-${item.type}`}
          />
      </SafeAreaView >


      // <View style={[s.body]}>
      //   <View style={[s.table]}>
      //     <View style={[s.thead]}>
      //       <View style={[s.tr]}>
      //         <View style={[s.th]}>
      //           <Text>Date</Text>
      //         </View>
      //         <View style={[s.th]}>
      //           <Text>Start Time</Text>
      //         </View>
      //         <View style={[s.th]}>
      //           <Text>Title</Text>
      //         </View>
      //       </View>
      //     </View>
      //     <View style={[s.tbody]}>
      //       <Card />
      //     </View>
      //   </View>
      // </View>


      // <View style={[s.body]}>
      //           <Text>Date</Text>
      //           <Text>Start Time</Text>
      //           <Text>Title</Text>
      //     <View style={[s.tbody]}>
      //       <Card />
      //     </View>
      // </View>
    );
}