import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screen untuk profile
import profileScreen from 'src/screens/profile';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={profileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
