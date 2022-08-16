import * as React from "react";
import { StyleSheet, Text, View } from 'react-native';
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

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardCell: {
    padding: 10,
  }
});

// 
// const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
// const { styles: s, constants: c } = bootstrapStyleSheet;


export default function Card({session}) {
  console.log('session', session);
  const start_date = new Date(session.start_at).toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: "numeric"});
  const start_time = new Date(session.start_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  console.log('start date', start_date);
  return (
    <View style={[styles.cardContainer]} key={session.id}>
      <View style={[styles.cardCell]}>
        <Text>{start_date}</Text>
      </View>
      <View style={[styles.cardCell]}>
        <Text>{start_time}</Text>
      </View>
      <View style={[styles.cardCell]}>
        <Text>{session.title}</Text>
      </View>
    </View>
  );
}