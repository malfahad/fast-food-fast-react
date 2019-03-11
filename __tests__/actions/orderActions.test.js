import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addToOrder, removeFromOrder, fetchOrders, placeOrder, updateOrderStatus,
} from '../../src/actions/orderActions';
import actionTypes from '../../src/actions/actionTypes';
import { BASE_URL } from '../../src/constants/index';

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


  it('should dispatch correct action on fetchOrders ', () => {
    const url = `${BASE_URL}/orders`;
    const body = { data: {} };
    const expectedActions = [{
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      payload: body.data,
    }];
    fetchMock.getOnce(url,
      {
        body,
      });
    const store = mockStore();
    store.dispatch(fetchOrders()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should set window.location on placeOrder', () => {
    const url = `${BASE_URL}/orders`;
    const body = { data: {} };
    const order = { items: ['1x Fries - 1000'] };
    window.location.replace = jest.fn();
    fetchMock.postOnce(url,
      {
        body,
      });
    const store = mockStore();
    store.dispatch(placeOrder(order)).then(() => {
      expect(window.location.replace).toHaveBeenCalled();
    });
  });
  it('should call alert on updateOrder', () => {
    const id = 1;
    const url = `${BASE_URL}/orders/${id}`;
    const body = { success: 'order status updated to rejected' };
    const status = { status: 'rejected' };
    global.alert = jest.fn();
    fetchMock.putOnce(url,
      {
        body,
      });
    const store = mockStore();
    store.dispatch(updateOrderStatus(id, status)).then(() => {
      expect(alert).toHaveBeenCalled();
    });
  });
});
