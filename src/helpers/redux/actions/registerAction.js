import axios from 'axios';
import {BASE_URL} from 'src/helpers/api';
import {
  NAME_REGISTER_CHANGED,
  EMAIL_REGISTER_CHANGED,
  PASSWORD_REGISTER_CHANGED,
  CONFIRM_PASSWORD_REGISTER_CHANGED,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
} from './types';
import {userLogin} from './loginAction';

export const emailRegisterChanged = (text) => {
  return {
    type: EMAIL_REGISTER_CHANGED,
    payload: text,
  };
};

export const passwordRegisterChanged = (text) => {
  return {
    type: PASSWORD_REGISTER_CHANGED,
    payload: text,
  };
};

export const nameRegisterChanged = (text) => {
  return {
    type: NAME_REGISTER_CHANGED,
    payload: text,
  };
};

export const confirmPasswordRegisterChanged = (text) => {
  return {
    type: CONFIRM_PASSWORD_REGISTER_CHANGED,
    payload: text,
  };
};

export const userRegister = (name, email, password, confirmPassword) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER,
    });

    if (
      email !== '' &&
      password !== '' &&
      name !== '' &&
      confirmPassword !== ''
    ) {
      if (
        password === confirmPassword &&
        password.length >= 8 &&
        confirmPassword.length >= 8
      ) {
        const formData = {
          name: name.trim(),
          email: email.trim(),
          password,
          password_confirmation: confirmPassword,
        };

        axios
          .post(`${BASE_URL}/api/register`, formData)
          .then(async () => {
            try {
              await dispatch({
                type: REGISTER_USER_SUCCESS,
              });
              await dispatch(userLogin(email, password));
            } catch (e) {
              console.log(e);
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              type: REGISTER_USER_FAIL,
              payload: 'Email sudah terdaftar, harap gunakan email yang lain',
            });
            console.log(err);
          });
      } else {
        dispatch({
          type: REGISTER_USER_FAIL,
          payload:
            'Password dan Konfirmasi Password harus lebih dari 8 karakter dan keduanya harus cocok.',
        });
      }
    } else {
      dispatch({type: REGISTER_USER_FAIL, payload: 'Semua form harus diisi!'});
    }
  };
};
