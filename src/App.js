import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './navigation/rootStackNavigator.js';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    RNBootSplash.show();
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 1500);
  }, []);

  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
