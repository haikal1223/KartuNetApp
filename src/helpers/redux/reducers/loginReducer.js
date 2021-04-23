import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  loading: false,
  error: '',
  success: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {...state, email: action.payload};
    case PASSWORD_CHANGED:
      return {...state, password: action.payload};
    case LOGIN_USER:
      return {...state, loading: true, error: '', success: false};
    case LOGIN_USER_FAIL:
      return {...state, error: action.payload, loading: false, success: false};
    case LOGIN_USER_SUCCESS:
      return {...INITIAL_STATE, loading: false, success: true};
    default:
      return state;
  }
};
