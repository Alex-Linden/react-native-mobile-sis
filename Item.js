import * as React from "react";
import { StyleSheet, SafeAreaView, Text, View, TouchableHighlight } from 'react-native';
import { DataTable } from 'react-native-paper';

const TYPES = {
  'L': 'Lecture',
  'E': 'Exercise',
  'V': 'Event',
  'A': 'Assessment',
};

/** Card
 *
 * props:
 * - session like {
 * }
 * - navigation
 *
 * List -> Card -> ItemDetail
 */
export default function Item({ session, navigation }) {

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
        hour: 'numeric',
        minute: '2-digit',
      }
    );
  const itemType = TYPES[session.type];

  return (
    <View>
      <TouchableHighlight
        onPress={() => navigation.navigate('ItemDetail', {
          session,
        })}>
        <View style={styles.cardContainer}>
          <View style={[styles.cardCell]}>
            <Text>{startDate}</Text>
            {/* <Text> {startTime}</Text> */}
          </View>
          <View style={[styles.cardCell]}>
            <Text>{startTime}</Text>
          </View>
          <View style={[styles.cardRight]}>
            <Text style={[styles.cardTitle]}>{session.title}</Text>
            <Text style={[styles.cardType]}>({itemType})</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  cardCell: {
    flex: 1,
    padding: 10,
  },

  cardRight: {
    flex: 2,
    flexDirection: 'column',
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