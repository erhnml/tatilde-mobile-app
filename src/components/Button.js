import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({onPress, title, bgColor, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.wrapper, ...style}}>
      <View style={{...styles.btn, backgroundColor: bgColor}}>
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
});

Button.defaultProps = {
  bgColor: 'blue',
};
export default Button;
