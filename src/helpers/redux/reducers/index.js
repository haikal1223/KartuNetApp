import {combineReducers} from 'redux';
import AuthReducer from './authReducer';
import LoginReducer from './loginReducer';
import RegisterReducer from './registerReducer';
import UserViewKartukuReducer from './userViewKartukuReducer';

export default combineReducers({
  auth: AuthReducer,
  loginForm: LoginReducer,
  registerForm: RegisterReducer,
  userViewKartuku: UserViewKartukuReducer,
});
