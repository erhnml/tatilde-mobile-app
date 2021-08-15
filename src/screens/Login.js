import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAuth} from '../context/auth';
import Input from '../components/Input';
import Button from '../components/Button';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Login = () => {
  const auth = useAuth();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)});

  const onSubmit = async user => {
    await AsyncStorage.setItem('auth', JSON.stringify(user));
    auth.dispatch({type: 'SET_LOGIN', user: {...user, advertiser: false}});
  };

  return (
    <View style={{padding: 10}}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            autoCapitalize="none"
            placeholder="Email Address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            error={errors.email}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            secureTextEntry={true}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.password}
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Button color="red" title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    paddingBottom: 10,
    color: 'red',
    paddingLeft: 5,
  },
});

export default Login;
