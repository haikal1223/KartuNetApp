import * as React from 'react';
import PropTypes from 'prop-types';
import {Button, View, Text} from 'react-native';

// Style
import styles from 'src/assets/style/main/index';

function profileScreen({navigation}) {
  return (
    <View style={styles.center}>
      <Text>Profile Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />

      {/* Go back to previous stack*/}
      <Button title="Go back" onPress={() => navigation.goBack()} />

      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

profileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
};

export default profileScreen;
