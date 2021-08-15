import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './src/navigation';
import {AuthProvider} from './src/context/auth';
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
