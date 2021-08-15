import React from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';
import {useAuth} from '../context/auth';

const Account = () => {
  const auth = useAuth();

  const logout = async () => {
    await AsyncStorage.removeItem('auth');
    auth.dispatch({type: 'LOGOUT'});
  };

  return (
    <View style={styles.wrapper}>
      <Button
        onPress={() => auth.dispatch({type: 'SWITCH_ACCOUNT'})}
        title={
          auth.state.user.advertiser
            ? 'Swith to Personel Account'
            : 'Switch to Ad Account'
        }
      />
      <Button
        style={styles.logoutBtn}
        bgColor="red"
        onPress={logout}
        title="Logout"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoutBtn: {
    marginTop: 20,
  },
});

export default Account;
