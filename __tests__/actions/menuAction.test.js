import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMenuAction, { removeFromMenu, addToMenu } from '../../src/actions/menuAction';
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


  it('should dispatch correct action on delete from menu', () => {
    const url = `${BASE_URL}/menu/1`;
    const expectedActions = [{
      type: actionTypes.MENU_DELETE_SUCCESS,
      payload: {
        id: 1,
        data: { message: 'Fries removed from menu' },
      },
    }];
    fetchMock.deleteOnce(url,
      {
        body: { message: 'Fries removed from menu' },
      });

    const store = mockStore();
    store.dispatch(removeFromMenu(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should reload window on post to menu', () => {
    const url = `${BASE_URL}/menu`;
    window.location.reload = jest.fn();
    fetchMock.postOnce(url,
      {
        body: { message: 'Fries added to menu' },
      });
    const body = JSON.stringify({ title: 'Fries' });
    const store = mockStore();
    store.dispatch(addToMenu(body)).then(() => {
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
