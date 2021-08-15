import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../components/Button';
import {useAuth} from '../context/auth';

const Account = () => {
  const auth = useAuth();

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
});

export default Account;
