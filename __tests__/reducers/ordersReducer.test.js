import actionTypes from '../../src/actions/actionTypes';
import ordersReducer from '../../src/reducers/ordersReducer';

const initialState = {
  orders: {},
};

describe('ordersReducer', () => {
  it('should return correct state for fetch successful', () => {
    const expectedState = {
      ...initialState,
      orders: {},
    };
    const action = {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      payload: {},
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });
  it('should return same state forinvalid state', () => {
    const expectedState = {
      ...initialState,
    };
    const action = {
      type: 'INVALID',
      payload: {},
    };
    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });
});
