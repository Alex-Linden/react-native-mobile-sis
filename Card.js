import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default function Card() {
  return (
    <View style={styles.container}>
      <Row>
        <Col>
          <Text>Mon 7/11</Text>
        </Col>
        <Col>
          <Text>Start time = 11am</Text>
        </Col>
        <Col>
        <Text>Session title</Text>
        </Col>
      </Row>
      <StatusBar style="auto" />
    </View>
  );
}