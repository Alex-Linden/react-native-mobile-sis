import * as React from "react";
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
// import BootstrapStyleSheet from 'react-native-bootstrap-styles';

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
const TYPES = {
  'L': 'Lecture',
  'E': 'Exercise',
  'V': 'Event',
  'A': 'Assessment',
};

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
  }
});

// 
// const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
// const { styles: s, constants: c } = bootstrapStyleSheet;


export default function Card({session}) {

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
        minute:'2-digit',
      }
    );
  const itemType = TYPES[session.type];
  
  return (
    <View style={[styles.cardContainer]}>
      <View style={[styles.cardCell]}>
        <Text>{startDate}</Text>
      </View>
      <View style={[styles.cardCell]}>
        <Text>{startTime}</Text>
      </View>
      <View style={[styles.cardCell]}>
        <Text style={[styles.cardTitle]}>{session.title}</Text>
        <Text style={[styles.cardType]}>({itemType})</Text>
      </View>
    </View>
  );
}