import menuReducer, { performAdd, performRemove } from '../../src/reducers/menuReducer';
import actionTypes from '../../src/actions/actionTypes';

const initialState = {
  menu: {},
  orderSummary: {},
  total: 0,
};
describe('Menu Reducer', () => {
  it('should return same state on invalid action', () => {
    const action = {
      type: 'INVALID',
      payload: {
        1: { title: 'Fries' },
      },
    };
    const expectedState = {
      ...initialState,
    };

    expect(menuReducer(initialState, action)).toEqual(expectedState);
  });
  it('should return correct state on menu fetch', () => {
    const action = {
      type: actionTypes.MENU_FETCH_SUCCESS,
      payload: {
        1: { title: 'Fries' },
      },
    };
    const expectedState = {
      ...initialState,
      menu: action.payload,
    };

    expect(menuReducer(initialState, action)).toEqual(expectedState);
  });

  it('should return correct state on add to order', () => {
    const action = {
      type: actionTypes.ADD_TO_ORDER,
      payload: 1,
    };
    initialState.menu = {
      1: { title: 'Fries', amount: 1000 },
    };

    const { addSummary, addTotal } = performAdd(action.payload,
      initialState.orderSummary,
      initialState.menu[action.payload]);
    const expectedState = {
      ...initialState,
      orderSummary: addSummary,
      total: addTotal,
    };
    expect(menuReducer(initialState, action)).toEqual(expectedState);
  });
  it('should return correct state on remove from order', () => {
    const action = {
      type: actionTypes.REMOVE_FROM_ORDER,
      payload: 1,
    };
    initialState.menu = {
      1: { title: 'Fries', amount: 1000 },
    };

    const { addSummary, addTotal } = performAdd(action.payload,
      initialState.orderSummary,
      initialState.menu[action.payload]);

    initialState.orderSummary = addSummary;
    initialState.total = addTotal;

    const { removeSummary, removeTotal } = performRemove(action.payload,
      initialState.orderSummary,
      initialState.menu[action.payload]);
    const expectedState = {
      ...initialState,
      orderSummary: removeSummary,
      total: removeTotal,
    };
    expect(menuReducer(initialState, action)).toEqual(expectedState);
  });
});
