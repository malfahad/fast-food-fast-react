import { combineReducers } from 'redux';
import userReducer from './userReducer';
import menuReducer from './menuReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
  userReducer,
  menuReducer,
  ordersReducer,
});
