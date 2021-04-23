import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {ScrollView, Text, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {KButton, KInput} from 'src/components';

// action creator
import {
  emailRegisterChanged,
  passwordRegisterChanged,
  nameRegisterChanged,
  confirmPasswordRegisterChanged,
  userRegister,
} from 'src/helpers/redux/actions';

// Style
import styles from 'src/assets/style/main';

const registerScreen = ({navigation}) => {
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState('');
  const register = useSelector((state) => state.registerForm);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        setRedirectMessage(
          'Dalam beberapa saat anda akan pindah ke halaman Beranda',
        );
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        }, 3000);
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

  const registerUser = () => {
    setLoading(true);
    dispatch(
      userRegister(
        register.name,
        register.email,
        register.password,
        register.confirmPassword,
      ),
    );
  };

  return (
    <KeyboardAwareScrollView
      behavior="padding"
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}>
      <ScrollView style={styles.registerContainer}>
        <Text style={styles.registerTitleStyle}>Bergabung bersama Kami</Text>
        {redirectMessage !== '' ? (
          <Text
            style={{
              ...styles.tealGreenColor,
              ...styles.marginBottom2,
              ...styles.subHeaderText2,
            }}>
            {redirectMessage}
          </Text>
        ) : null}
        {register.error ? (
          <Text style={{...styles.redMaroonColor, ...styles.marginBottom2}}>
            {register.error}
          </Text>
        ) : null}
        <KInput
          containerStyle={styles.containerStyle}
          labelTextInput="Nama Lengkap"
          labelStyle={styles.labelTextInputStyle}
          textInputStyleContainer={styles.textInputStyleContainer}
          textInputStyle={styles.textInputStyle}
          placeholder="Masukkan Nama Lengkap"
          value={register.name}
          onChangeText={(text) => dispatch(nameRegisterChanged(text))}
        />
        <KInput
          containerStyle={styles.containerStyle}
          labelTextInput="Email"
          labelStyle={styles.labelTextInputStyle}
          textInputStyleContainer={styles.textInputStyleContainer}
          textInputStyle={styles.textInputStyle}
          placeholder="Masukkan Email"
          keyboardType={Platform.OS === 'ios' ? null : 'visible-password'}
          autoCapitalize="characters"
          value={register.email}
          onChangeText={(text) =>
            dispatch(emailRegisterChanged(text.toLowerCase()))
          }
        />
        <KInput
          containerStyle={styles.containerStyle}
          labelTextInput="Password"
          labelStyle={styles.labelTextInputStyle}
          textInputStyleContainer={styles.textInputStyleContainer}
          textInputStyle={styles.textInputStyle}
          placeholder="Masukkan Password"
          secureTextEntry={true}
          value={register.password}
          onChangeText={(text) => dispatch(passwordRegisterChanged(text))}
        />
        <KInput
          containerStyle={styles.containerStyle}
          labelTextInput="Konfirmasi Password"
          labelStyle={styles.labelTextInputStyle}
          textInputStyleContainer={styles.textInputStyleContainer}
          textInputStyle={styles.textInputStyle}
          placeholder="Masukkan Konfirmasi Password"
          secureTextEntry={true}
          value={register.confirmPassword}
          onChangeText={(text) =>
            dispatch(confirmPasswordRegisterChanged(text))
          }
        />
        <KButton
          title="Register"
          buttonStyle={styles.registerButton}
          textStyle={styles.loginButtonText}
          onPress={registerUser}
          isLoading={register.loading}
          loadingColor="white"
        />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

registerScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default registerScreen;
