import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Ads = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Ad Listing</Text>
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

export default Ads;
