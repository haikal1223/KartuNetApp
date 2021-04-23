import {ASSIGN_USERDATA_VIEW_KARTUKU} from '../actions/types';

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
};

const INITIAL_STATE = {
  kartukuUser: USER_INITIAL_STATE,
  tokenChecked: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASSIGN_USERDATA_VIEW_KARTUKU:
      return {...state, kartukuUser: action.payload, tokenChecked: true};
    default:
      return state;
  }
};
