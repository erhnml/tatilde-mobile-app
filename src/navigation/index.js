import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons';

//screens
import HomeScreen from '../screens/Home';
import Login from '../screens/Login';
import Favorites from '../screens/Favorites';
import Trips from '../screens/Trips';
import Account from '../screens/Account';
import Listing from '../screens/Listing';
import AddAds from '../screens/AddAd';
//context
import {useAuth} from '../context/auth';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const auth = useAuth();
  if (auth.state.loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      {auth.state.login ? (
        <>
          {auth.state.user.advertiser ? (
            <>
              <Tab.Screen
                name="Listing"
                component={Listing}
                options={{
                  tabBarIcon: () => <IonIcon name="list-outline" size={24} />,
                }}
              />
              <Tab.Screen
                name="Add Advertisement"
                component={AddAds}
                options={{
                  tabBarIcon: () => (
                    <IonIcon name="add-circle-outline" size={24} />
                  ),
                }}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarIcon: () => <IonIcon name="home-outline" size={24} />,
                }}
              />
              <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                  tabBarIcon: () => <IonIcon name="heart-outline" size={24} />,
                }}
              />
              <Tab.Screen
                name="Trips"
                component={Trips}
                options={{
                  tabBarIcon: () => (
                    <IonIcon name="calendar-outline" size={24} />
                  ),
                }}
              />
            </>
          )}
          <Tab.Screen
            name="Account"
            component={Account}
            options={{
              tabBarIcon: () => <IonIcon name="person-outline" size={24} />,
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => <IonIcon name="home-outline" size={24} />,
            }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarIcon: () => <IonIcon name="log-in-outline" size={24} />,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
