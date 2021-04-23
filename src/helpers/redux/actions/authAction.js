import {AUTH_USER_SUCCESS, LOGOUT_USER} from './types';

export const keepLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: AUTH_USER_SUCCESS,
      payload: {
        ...data,
      },
    });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
    });
  };
};
