import React from 'react';

import {Text, View, TextInput, Button, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAuth} from '../context/auth';

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
          <TextInput
            autoCapitalize="none"
            placeholder="Email Address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              height: 45,
              marginBottom: 10,
              paddingLeft: 10,
            }}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              height: 45,
              marginBottom: 10,
              paddingLeft: 10,
            }}
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Button color="red" title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Login;
