import React from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';

// Screen untuk komunitasku
import dashboardScreen from 'src/screens/dashboard';

// Assets and Style
import styles from 'src/assets/style/main';
import BackArrow from 'src/assets/image/svg/back-arrow.svg';
import BackArrowWhite from 'src/assets/image/svg/back-arrow-white-new.svg';

const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: '#fff'}}}>
      {/* Komunitas Screen */}
      <Stack.Screen
        name="dashboard"
        component={dashboardScreen}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'DASHBOARD',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
          },
          // eslint-disable-next-line react/display-name
          headerBackImage: () => <BackArrowWhite />,
        }}
      />
    </Stack.Navigator>
  );
};

DashboardStackNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default DashboardStackNavigator;
