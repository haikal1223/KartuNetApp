import React from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';

// components
import {KHeaderButton} from 'src/components';

// Screen untuk profile
import notifikasiScreen from 'src/screens/notifikasi';

// Assets and Style
import styles from 'src/assets/style/main';
import BackArrow from 'src/assets/image/svg/back-arrow.svg';
import BackArrowWhite from 'src/assets/image/svg/back-arrow-white-new.svg';

const Stack = createStackNavigator();

const KartukuStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: '#fff'}}}>
      <Stack.Screen
        name="Notifikasi"
        component={notifikasiScreen}
        options={{
          headerStyle: {
            ...styles.headerPurple,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            ...styles.headerLeftStyle,
          },
          title: 'NOTIFIKASI',
          headerTitleStyle: {
            ...styles.headerCenterStyle,
            ...styles.whiteColor,
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

KartukuStackNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default KartukuStackNavigator;
