import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {CommonActions} from '@react-navigation/native';
import {ScrollView, Text, Image, View, LogBox} from 'react-native';
import {KButton} from 'src/components';

// action creator
import {userLogin, logOut} from 'src/helpers/redux/actions';

// Style
import styles from 'src/assets/style/main';

const welcomeScreen = ({navigation}) => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const login = useSelector((state) => state.loginForm);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        const userData = JSON.parse(value);
        dispatch(userLogin(userData.email, userData.password));
      } else {
        dispatch(logOut());
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
    checkToken();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (auth.tokenChecked) {
      if (user.id) {
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );
      } else {
        setLoading(false);
      }
    }
  }, [login.success, user]);

  if (loading) {
    return <View />;
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.welcomeContainer}>
      <Image
        source={require('src/assets/image/logo/kartunet-logo.png')}
        style={styles.welcomeLogo}
      />
      <Text style={styles.welcomeText}>Selamat datang di KartuNet</Text>
      <Text style={styles.subWelcomeText}>
        Aplikasi kartu nama digital dengan fiture terlengkap
      </Text>
      <KButton
        title="Log In"
        buttonStyle={styles.blackButton}
        textStyle={styles.loginButtonText}
        onPress={() => navigation.navigate('Login')}
        isLoading={false}
        loadingColor="white"
      />
      <KButton
        title="Join KartuNet"
        buttonStyle={styles.purpleMainButton}
        textStyle={styles.loginButtonText}
        onPress={() => navigation.navigate('Register')}
        isLoading={false}
        loadingColor="white"
      />
    </ScrollView>
  );
};

welcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default welcomeScreen;
