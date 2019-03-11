import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMenuAction from '../../src/actions/menuAction';
import { BASE_URL } from '../../src/constants/index';
import actionTypes from '../../src/actions/actionTypes';

const mockStore = configureStore([thunk]);

describe('AuthAction', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should dispatch correct action on get menu', () => {
    const url = `${BASE_URL}/menu`;
    const expectedActions = [{
      type: actionTypes.MENU_FETCH_SUCCESS,
      payload: {
        1: { title: 'Fries', amount: 1000 },
      },
    }];
    fetchMock.getOnce(url, {
      body: {
        1: { title: 'Fries', amount: 1000 },
      },
    });

    const store = mockStore();
    store.dispatch(fetchMenuAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
