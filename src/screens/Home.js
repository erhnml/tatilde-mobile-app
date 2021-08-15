import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import AnimatedTextType from '../components/AnimatedTextType';

const Home = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const list = [
    'Antayla, Kaş',
    'Muğla, Bodrum',
    'Antayla, Kemer',
    'İzmir, Çeşme',
  ];
  const inputRef = useRef(null);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.wrapper}>
        <View style={styles.logoWrapper}>
          <Image
            style={styles.logo}
            source={require('../assets/icons/logo.png')}
            resizeMode="cover"
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={inputRef}
            style={styles.input}
            onChangeText={setQuery}
          />
          {!isFocused ? (
            <View style={styles.animationContainer}>
              <TouchableWithoutFeedback
                onPress={() => inputRef.current.focus()}>
                <View style={styles.animationWrapper}>
                  <IonIcon
                    name="navigate-circle-outline"
                    size={24}
                    style={styles.locationIcon}
                  />
                  <AnimatedTextType list={list} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <View style={styles.searchItems}>
              {list
                .filter(item => item.includes(query))
                .map((item, i) => (
                  <TouchableOpacity key={`${item}-${i}`}>
                    <View style={styles.searchItem}>
                      <Text>{item}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {padding: 10, paddingTop: 30, flex: 1},
  logoWrapper: {alignItems: 'center', marginBottom: 30},
  logo: {width: 300, height: 50},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    height: 45,
    paddingLeft: 10,
  },
  inputWrapper: {position: 'relative'},
  searchItems: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
    padding: 10,
    paddingBottom: 0,
  },
  searchItem: {
    marginBottom: 15,
  },
  animationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  animationContainer: {position: 'absolute', left: 10, width: '100%'},
  locationIcon: {
    marginRight: 10,
  },
});

export default Home;
