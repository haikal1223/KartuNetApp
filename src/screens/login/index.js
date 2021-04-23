import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {KButton, KInput} from 'src/components';

// action creator
import {
  emailLoginChanged,
  passwordLoginChanged,
  userLogin,
} from 'src/helpers/redux/actions';

// Style
import styles from 'src/assets/style/main';

function loginScreen({ navigation }) {
  const auth = useSelector((state) => state.auth);
  const login = useSelector((state) => state.loginForm);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (auth.user !== null) {
      fetchData();
    }
  }, [auth.user]);

  return (
    <KeyboardAwareScrollView
      behavior="padding"
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}>
      <ScrollView style={styles.loginContainer}>
        {login.error ? (
          <Text
            style={{
              ...styles.redMaroonColor,
              ...styles.marginBottom2,
              ...styles.subHeaderText2,
            }}>
            {login.error}
          </Text>
        ) : null}
        <KInput
          containerStyle={styles.containerStyle}
          labelTextInput="Email"
          labelStyle={styles.labelTextInputStyle}
          textInputStyleContainer={styles.textInputStyleContainer}
          textInputStyle={styles.textInputStyle}
          placeholder="Masukkan Email"
          value={login.email}
          onChangeText={(text) => dispatch(emailLoginChanged(text))} />
        <KInput
          containerStyle={styles.containerStyle}
          labelTextInput="Password"
          labelStyle={styles.labelTextInputStyle}
          textInputStyleContainer={styles.textInputStyleContainer}
          textInputStyle={styles.textInputStyle}
          placeholder="Masukkan Password"
          flexTextInput={4}
          secureTextEntry={true}
          value={login.password}
          onChangeText={(text) => dispatch(passwordLoginChanged(text))}
          childrenComponent={<View style={{ ...styles.forgotPasswordStyleContainer }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('forgotPassword')}>
              <Text style={{ ...styles.forgotPasswordTextStyle }}>FORGOT?</Text>
            </TouchableOpacity>
          </View>} />
        <KButton
          title="Log In"
          buttonStyle={styles.purpleMainButton}
          textStyle={styles.loginButtonText}
          onPress={() => dispatch(userLogin(login.email, login.password))}
          isLoading={login.loading}
          loadingColor="white" />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

loginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default loginScreen;
