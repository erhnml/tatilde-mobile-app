import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        user: action.user,
        login: true,
        loading: false,
      };
    case 'SWITCH_ACCOUNT':
      return {
        ...state,
        user: {
          ...action.user,
          advertiser: !state.user.advertiser,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: !state.loading,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({children}) {
  const [state, dispatch] = React.useReducer(authReducer, {
    login: false,
    loading: true,
  });
  const value = {state, dispatch};

  useEffect(() => {
    const getLocalData = async () => {
      const localData = await AsyncStorage.getItem('auth');
      if (localData) {
        dispatch({type: 'SET_LOGIN', user: JSON.parse(localData)});
        return;
      }
      dispatch({type: 'SET_LOADING'});
    };
    getLocalData();
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export {AuthProvider, useAuth};
