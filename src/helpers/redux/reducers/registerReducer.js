import {
  NAME_REGISTER_CHANGED,
  EMAIL_REGISTER_CHANGED,
  PASSWORD_REGISTER_CHANGED,
  CONFIRM_PASSWORD_REGISTER_CHANGED,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_REGISTER_CHANGED:
      return {...state, email: action.payload};
    case PASSWORD_REGISTER_CHANGED:
      return {...state, password: action.payload};
    case NAME_REGISTER_CHANGED:
      return {...state, name: action.payload};
    case CONFIRM_PASSWORD_REGISTER_CHANGED:
      return {...state, confirmPassword: action.payload};
    case REGISTER_USER:
      return {...state, loading: true, error: ''};
    case REGISTER_USER_FAIL:
      return {...state, error: action.payload, loading: false};
    case REGISTER_USER_SUCCESS:
      return {...INITIAL_STATE, loading: false};
    default:
      return state;
  }
};
