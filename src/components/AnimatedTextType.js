import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';

const AnimatedTextType = ({list}) => {
  const [selectedValue, setSelectedValue] = useState(() => list[0]);
  const textArr = selectedValue.split('');
  const animatedValues = textArr.map(() => new Animated.Value(0));

  useEffect(() => {
    const animations = textArr.map((_, i) => {
      return Animated.spring(animatedValues[i], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      });
    });
    Animated.stagger(200, animations).start(({finished}) => {
      const findIndex = list.findIndex(listItem => listItem === selectedValue);
      if (list[findIndex + 1]) {
        setSelectedValue(list[findIndex + 1]);
      } else {
        setSelectedValue(list[0]);
      }
    });
  }, [animatedValues, textArr, selectedValue, list]);

  return (
    <View style={styles.wrapper}>
      {textArr.map((letter, i) => (
        <Animated.Text
          key={`${letter}-${i}`}
          style={{fontWeight: 'bold', opacity: animatedValues[i]}}>
          {letter}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
});

export default AnimatedTextType;
