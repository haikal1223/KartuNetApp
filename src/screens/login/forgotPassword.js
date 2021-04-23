import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {ScrollView, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {KButton, KInput} from 'src/components';

// Style
import styles from 'src/assets/style/main';
import {BASE_URL} from 'src/helpers/api';

const forgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const onRequestResetPassword = async () => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/user/reset_password`, {email});
      setLoading(false);
      setSuccessMessage(
        'Mohon cek email anda untuk mendapatkan link reset password.',
      );
    } catch (e) {
      setSuccessMessage(null);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      behavior="padding"
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={false}>
      <ScrollView style={styles.loginContainer}>
        {successMessage !== '' ? (
          <Text
            style={{
              ...styles.tealGreenColor,
              ...styles.marginBottom2,
              ...styles.subHeaderText2,
            }}>
            {successMessage}
          </Text>
        ) : null}
        <KInput
          containerStyle={styles.containerStyle}
          labelTextInput="Email"
          labelStyle={styles.labelTextInputStyle}
          textInputStyleContainer={styles.textInputStyleContainer}
          textInputStyle={styles.textInputStyle}
          placeholder="Masukkan Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <KButton
          title="Kirim Link Reset Password"
          buttonStyle={styles.purpleMainButton}
          textStyle={styles.loginButtonText}
          onPress={() => onRequestResetPassword()}
          isLoading={loading}
          loadingColor="white"
        />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

forgotPasswordScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default forgotPasswordScreen;
