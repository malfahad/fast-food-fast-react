import actionTypes from '../../src/actions/actionTypes';

import userReducer from '../../src/reducers/userReducer';

const initialState = {
  isAdmin: false,
  authErrors: '',
  isLoggedIn: false,
  authorization: '',
};

describe('Userreducer', () => {
  it('should return valid state on auth failed', () => {
    const expectedState = {
      ...initialState,
      isLoggedIn: false,
      authErrors: 'invalid password or username',
    };

    const action = {
      type: actionTypes.AUTH_FAILED,
      payload: 'invalid password or username',
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should return valid state on auth success', () => {
    const expectedState = {
      ...initialState,
      isLoggedIn: true,
      authErrors: '',
      authorization: 'sample.token.123',
    };

    const action = {
      type: actionTypes.AUTH_SUCCESS,
      payload: 'sample.token.123',
      isAdmin: false,
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should return same state on invalid action', () => {
    const expectedState = { ...initialState };

    const action = {
      type: 'INVALID',
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
