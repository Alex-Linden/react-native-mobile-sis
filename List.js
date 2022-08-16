import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import Card from "./Card";

const
  BODY_COLOR = '#000022',
  TEXT_PRIMARY = '#882288';

// custom constants
const constants = {
  BODY_COLOR, TEXT_PRIMARY,
};

// custom classes
const classes = {
  title: {
    color: 'red',
  }
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  listHeader: {
    flexDirection: 'row',
  }
});

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const { styles: s, constants: c } = bootstrapStyleSheet;

class List extends Component {
  render() {
    return (
      <View style={[styles.listContainer]}>
        <View style={[styles.listHeader]}>
          <Text>Date</Text>
          <Text>Start Time</Text>
          <Text>Title</Text>
        </View>
          <Card />
      </View >


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
}

export default List;