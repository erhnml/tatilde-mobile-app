import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  btn: {
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
