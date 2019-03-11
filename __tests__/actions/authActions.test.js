import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import authAction from '../../src/actions/authAction';
import { BASE_URL } from '../../src/constants/index';
import actionTypes from '../../src/actions/actionTypes';

const mockStore = configureStore([thunk]);

describe('AuthAction', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should dispatch correct action on login success', () => {
    const path = 'login';
    const payload = {
      username: 'test_user',
      password: 'test_password',
    };
    const url = `${BASE_URL}/auth/${path}`;
    const isAdmin = path.includes('admin');
    const expectedActions = [{
      type: actionTypes.AUTH_SUCCESS,
      payload: 'token.123.qweq2e',
      isAdmin,
    }];
    fetchMock.postOnce(url, {
      body: {
        authorization: 'token.123.qweq2e',
      },
    });

    const store = mockStore();
    store.dispatch(authAction(path, payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should dispatch correct action on login failed', () => {
    const path = 'login';
    const payload = {
      username: 'test_user',
      password: 'test_password',
    };
    const url = `${BASE_URL}/auth/${path}`;
    const isAdmin = path.includes('admin');
    const expectedActions = [{
      type: actionTypes.AUTH_FAILED,
      payload: 'invalid password or username',
      isAdmin,
    }];
    fetchMock.postOnce(url, {
      body: {
        error: 'invalid password or username',
      },
    });

    const store = mockStore();
    store.dispatch(authAction(path, payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
