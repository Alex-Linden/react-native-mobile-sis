import * as React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { COLORS, TYPES } from "./vocabs";


/** Item displays basic information for an item to be displayed in list
 *
 * props:
 * - session: {description,
 * id,
 * staff_terse,
 * start_at,
 * start_date,
 * status,
 * title,
 * type,
 * week_group}
 * - navigation
 *
 * List -> Item -> ItemDetail
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
        <View style={styles.itemContainer}>
          <View style={[styles.itemCell]}>
            <Text>{startDate}</Text>
          </View>
          <View style={[styles.itemCell]}>
            <Text>{startTime}</Text>
          </View>
          <View style={[styles.itemRight]}>
            <Text style={[styles.itemTitle]}>{session.title}</Text>
            <Text style={[styles.itemType]}>({itemType})</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  itemCell: {
    flex: 1,
    padding: 10,
  },

  itemRight: {
    flex: 2,
    flexDirection: 'column',
  },

  itemTitle: {
    fontWeight: 'bold',
    color: COLORS.title
  },

  itemType: {
    color: COLORS.lightGrey,
    size: '0.875em',
  }
});