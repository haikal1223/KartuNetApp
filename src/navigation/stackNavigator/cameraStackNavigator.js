import React from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';
import {KHeaderButton} from 'src/components';

// Screen untuk profile
import cameraScreen from 'src/screens/camera';

// Assets and Style
import styles from 'src/assets/style/main';
import BackArrowWhite from 'src/assets/image/svg/back-arrow-white.svg';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const CameraStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="ScanBarcode"
        component={cameraScreen}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'SCAN BARCODE',
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            ...styles.headerWhiteStyle,
          },
          // eslint-disable-next-line react/display-name
          headerLeft: () => (
            <KHeaderButton
              onPress={() => navigation.goBack()}
              icon={<BackArrowWhite />}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

CameraStackNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default CameraStackNavigator;
