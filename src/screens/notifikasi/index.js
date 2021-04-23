import * as React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

// Style
import styles from 'src/assets/style/main';

function notifikasiScreen({navigation}) {
  return (
    <View
      style={{
        ...styles.center,
        ...styles.alignSelfCenter,
        ...styles.flex1DirectionColumn,
        ...styles.justifyContentCenter,
      }}>
      <Text style={styles.subHeaderText}>Coming Soon</Text>
    </View>
  );
}

notifikasiScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default notifikasiScreen;
