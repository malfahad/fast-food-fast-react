import menuReducer from '../../src/reducers/menuReducer';
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

  it('should return correct status on delete menu item', () => {
    const action = {
      type: actionTypes.MENU_DELETE_SUCCESS,
      payload: { id: 1 },
    };
    initialState.menu = {
      1: { title: 'Fries' },
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
      1: { title: 'Fries', amount: 500 },
    };

    const expectedState = {
      ...initialState,
      orderSummary: {
        1:
      {
        count: 2,
        subTotal: 1000,
        title: 'Fries',
      },
      },
      total: 1000,
    };
    const newState = menuReducer(initialState, action);
    expect(menuReducer(newState, action)).toEqual(expectedState);
  });
  it('should return correct state on remove from order', () => {
    const action = {
      type: actionTypes.REMOVE_FROM_ORDER,
      payload: 1,
    };
    initialState.menu = {
      1: { title: 'Fries', amount: 1000 },
    };

    initialState.orderSummary = {
      1:
      {
        count: 2,
        subTotal: 1000,
        title: 'Fries',
      },
    };

    const expectedState = {
      ...initialState,
      orderSummary: {},
      total: 0,
    };
    const newState = menuReducer(initialState, action);
    expect(menuReducer(newState, action)).toEqual(expectedState);
  });
});
