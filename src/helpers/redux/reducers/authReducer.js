import {AUTH_USER_SUCCESS, LOGOUT_USER} from '../actions/types';

const USER_INITIAL_STATE = {
  id: null,
  name: '',
  firstName: '',
  lastName: '',
  slug: null,
  email: null,
  photo: null,
  phone: null,
  bio: null,
  pekerjaan: null,
  facebook: null,
  twitter: null,
  linkedin: null,
  instagram: null,
  token: null,
};

const INITIAL_STATE = {
  user: USER_INITIAL_STATE,
  tokenChecked: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER_SUCCESS:
      return {...state, user: action.payload, tokenChecked: true};
    case LOGOUT_USER:
      return {...state, user: USER_INITIAL_STATE, tokenChecked: true};
    default:
      return state;
  }
};
