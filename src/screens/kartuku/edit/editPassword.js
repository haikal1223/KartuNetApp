import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {View, ScrollView, Text, TouchableOpacity, Keyboard} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// connection to API
import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';

// components
import {KButton, KInput} from 'src/components';

// Style
import styles from 'src/assets/style/main/index';

const editPasswordScreen = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [oldPasswordHidden, setOldPasswordHidden] = useState(true);
  const [newPasswordHidden, setNewPasswordHidden] = useState(true);
  const [confirmNewPasswordHidden, setConfirmNewPasswordHidden] = useState(
    true,
  );

  const [validation, setValidation] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (
      oldPassword.length !== 0 &&
      newPassword.length !== 0 &&
      confirmNewPassword.length !== 0
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [oldPassword, newPassword, confirmNewPassword]);

  const redirectAfterUpdate = () => {
    setTimeout(() => {
      navigation.navigate('ProfileKartuku');
    }, 3000);
  };

  useEffect(() => {
    if (redirect) {
      redirectAfterUpdate();
    }
  }, [redirect]);

  // eslint-disable-next-line react/prop-types
  const RenderHiddenIcon = ({hiddenStatus}) => {
    const size = 20;
    const color = '#A7A9AB';
    let name = 'eye-outline';

    if (hiddenStatus) {
      name = 'eye-off-outline';
    }

    return <Ionicons name={name} size={size} color={color} />;
  };

  const updatePassword = async () => {
    try {
      setValidation(false);
      setLoadingSubmit(true);
      setErrorMessage(null);
      Keyboard.dismiss();
      if (newPassword !== confirmNewPassword) {
        setErrorMessage(
          'Password Baru dan Konfirmasi Password Baru harus sama.',
        );
      } else {
        const options = {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: 'application/json',
          },
        };

        const formData = {
          id: user.id,
          current_password: oldPassword,
          password: newPassword,
          password_confirmation: confirmNewPassword,
        };
        await axios.post(
          `${BASE_URL}/api/user/update_password`,
          formData,
          options,
        );

        await AsyncStorage.setItem(
          '@storage_Key',
          JSON.stringify({...user, password: newPassword}),
        );

        setSuccessMessage('Update Password Berhasil');
        setRedirect(true);
      }
    } catch (e) {
      if (newPassword.length < 8) {
        setErrorMessage(
          'Password Baru setidaknya harus 8 karakter atau lebih.',
        );
      } else {
        setErrorMessage('Password Anda Saat ini salah.');
      }
      console.log(e);
    }
  };

  const RenderSubmitButton = () => {
    if (validation) {
      return (
        <KButton
          title="Selesai"
          buttonStyle={styles.greenBottomButton}
          textStyle={{
            ...styles.whiteColor,
            ...styles.subHeaderText2,
          }}
          onPress={() => updatePassword()}
        />
      );
    }

    return (
      <KButton
        title="Selesai"
        buttonStyle={styles.lightGrayColor2BottomButton}
        textStyle={{
          ...styles.whiteColor,
          ...styles.subHeaderText2,
        }}
        activeOpacity={1}
        isLoading={loadingSubmit}
        loadingColor="white"
      />
    );
  };

  return (
    <>
      <ScrollView>
        <View style={styles.kartukuMainContainer}>
          {errorMessage ? (
            <Text
              style={{
                ...styles.redMaroonColor,
                ...styles.marginBottom2,
                ...styles.subHeaderText2,
              }}>
              {errorMessage}
            </Text>
          ) : null}
          <View style={styles.marginTop30}>
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Password Saat ini"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder=""
              value={oldPassword}
              secureTextEntry={oldPasswordHidden}
              onChangeText={(text) => setOldPassword(text)}
              childrenComponent={
                <View
                  style={{
                    ...styles.forgotPasswordStyleContainer,
                    ...styles.alignItemsFlexEnd,
                  }}>
                  <TouchableOpacity
                    onPress={() => setOldPasswordHidden(!oldPasswordHidden)}>
                    <RenderHiddenIcon hiddenStatus={oldPasswordHidden} />
                  </TouchableOpacity>
                </View>
              }
            />
            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Password Baru"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder=""
              value={newPassword}
              secureTextEntry={newPasswordHidden}
              onChangeText={(text) => setNewPassword(text)}
              childrenComponent={
                <View
                  style={{
                    ...styles.forgotPasswordStyleContainer,
                    ...styles.alignItemsFlexEnd,
                  }}>
                  <TouchableOpacity
                    onPress={() => setNewPasswordHidden(!newPasswordHidden)}>
                    <RenderHiddenIcon hiddenStatus={newPasswordHidden} />
                  </TouchableOpacity>
                </View>
              }
            />

            <KInput
              containerStyle={styles.containerStyle}
              labelTextInput="Konfirmasi Password Baru"
              labelStyle={{
                ...styles.labelTextInputStyle,
                ...styles.lightGrayColor2,
              }}
              textInputStyleContainer={styles.textInputWithAllBorder}
              textInputStyle={{...styles.textInputStyle, ...styles.blackColor2}}
              placeholder=""
              secureTextEntry={confirmNewPasswordHidden}
              value={confirmNewPassword}
              onChangeText={(text) => setConfirmNewPassword(text)}
              childrenComponent={
                <View
                  style={{
                    ...styles.forgotPasswordStyleContainer,
                    ...styles.alignItemsFlexEnd,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      setConfirmNewPasswordHidden(!confirmNewPasswordHidden)
                    }>
                    <RenderHiddenIcon hiddenStatus={confirmNewPasswordHidden} />
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </ScrollView>
      <View>
        {successMessage ? (
          <Text
            style={{
              ...styles.tealGreenColor,
              ...styles.marginBottom2,
              ...styles.alignSelfCenter,
              ...styles.subHeaderText2,
            }}>
            {successMessage}
          </Text>
        ) : null}

        <RenderSubmitButton />
      </View>
    </>
  );
};

editPasswordScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default editPasswordScreen;
