import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//screens
import HomeScreen from '../screens/Home';
import Login from '../screens/Login';
import Favorites from '../screens/Favorites';
import Trips from '../screens/Trips';
import Account from '../screens/Account';

//context
import {useAuth} from '../context/auth';
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const auth = useAuth();
  console.log(auth);
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      {!auth.state.login ? (
        <Tab.Screen name="Login" component={Login} />
      ) : (
        <>
          <Tab.Screen name="Favorites" component={Favorites} />
          <Tab.Screen name="Trips" component={Trips} />
          <Tab.Screen name="Account" component={Account} />
        </>
      )}
    </Tab.Navigator>
  );
}
