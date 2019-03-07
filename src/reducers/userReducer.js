import actionTypes from '../actions/actionTypes';

const initialState = {
  authErrors: '',
  isLoggedIn: false,
  authorization: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        authErrors: action.payload,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authErrors: '',
        authorization: action.payload,
      };
    default: return { ...state };
  }
};

export default userReducer;