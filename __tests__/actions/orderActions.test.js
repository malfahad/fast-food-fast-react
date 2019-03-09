import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addToOrder, removeFromOrder } from '../../src/actions/orderActions';
import actionTypes from '../../src/actions/actionTypes';

const mockStore = configureStore([thunk]);

describe('AuthAction', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should dispatch correct action on add to order', () => {
    const itemId = 1;
    const expectedActions = [{
      type: actionTypes.ADD_TO_ORDER,
      payload: itemId,
    }];

    const store = mockStore();
    store.dispatch(addToOrder(itemId));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should dispatch correct action on remove from order', () => {
    const itemId = 1;
    const expectedActions = [{
      type: actionTypes.REMOVE_FROM_ORDER,
      payload: itemId,
    }];

    const store = mockStore();
    store.dispatch(removeFromOrder(itemId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
