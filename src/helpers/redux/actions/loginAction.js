import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  AUTH_USER_SUCCESS,
} from './types';

export const emailLoginChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordLoginChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const userLogin = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER,
    });

    if (email !== '' && password !== '') {
      const formData = {
        email: email,
        password,
      };

      axios
        .post(`${BASE_URL}/api/login`, formData)
        .then((resultLogin) => {
          const {id, token} = resultLogin.data.data;
          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          };
          axios
            .get(`${BASE_URL}/api/user/${id}`, options)
            .then(async (resultUserData) => {
              try {
                const arrayName = resultUserData.data.data.name.split(' ');
                const userData = {
                  email: formData.email,
                  password,
                  token: resultLogin.data.data.token,
                  firstName: arrayName[0],
                  lastName: arrayName[arrayName.length - 1],
                  ...resultUserData.data.data,
                };

                await dispatch({
                  type: LOGIN_USER_SUCCESS,
                });
                await dispatch({
                  type: AUTH_USER_SUCCESS,
                  payload: {
                    ...userData,
                  },
                });
                await AsyncStorage.setItem(
                  '@storage_Key',
                  JSON.stringify({...userData}),
                );
              } catch (e) {
                console.log(e);
              }
            })
            .catch((err) => {
              dispatch({
                type: LOGIN_USER_FAIL,
                payload:
                  'Ada kesalahan pada sistem kami. Harap mencoba beberapa saat lagi.',
              });
              console.log(err);
            });
        })
        .catch((err) => {
          dispatch({
            type: LOGIN_USER_FAIL,
            payload: 'Username atau Password Salah',
          });
          console.log(err);
        });
    } else {
      dispatch({type: LOGIN_USER_FAIL, payload: 'Semua form harus diisi!'});
    }
  };
};
