import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Trips = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Trips</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Trips;
