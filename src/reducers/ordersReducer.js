import actionTypes from '../actions/actionTypes';

const initialState = {
  orders: {},
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default ordersReducer;
