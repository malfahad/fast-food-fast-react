import { combineReducers } from 'redux';
import userReducer from './userReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  userReducer,
  menuReducer,
});
