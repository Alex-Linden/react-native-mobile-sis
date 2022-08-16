import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

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

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
const { styles: s, constants: c } = bootstrapStyleSheet;


export default function Card() {
  return (
    <View style={[s.tr]}>
      <View style={[s.td]}>
        <Text>7/11</Text>
      </View>
      <View style={[s.td]}>
        <Text>11 am</Text>
      </View>
      <View style={[s.td]}>
        <Text>Session Title</Text>
      </View>
    </View>
  );
}