import actionTypes from '../actions/actionTypes';

const initialState = {
  menu: {},
  orderSummary: {},
  total: 0,
};

export const performAdd = (id, summary, menuItem) => {
  if (summary[id] === undefined) {
    summary[id] = {
      count: 1,
      subTotal: menuItem.amount,
      title: menuItem.title,
    };
  } else {
    const newCount = summary[id].count + 1;
    summary[id] = {
      count: newCount,
      subTotal: menuItem.amount * newCount,
      title: menuItem.title,
    };
  }
  const combined = Object.values(summary).reduce((acc, item) => (
    { subTotal: acc.subTotal + item.subTotal }
  ), 0);

  return { addSummary: summary, addTotal: combined.subTotal };
};

export const performRemove = (id, summary, menuItem) => {
  const newCount = summary[id].count - 1;
  if (newCount === 0) {
    delete summary[id];
  } else {
    summary[id] = {
      count: newCount,
      subTotal: menuItem.amount * newCount,
      title: menuItem.title,
    };
  }
  const combined = Object.values(summary).reduce((acc, item) => (
    { subTotal: acc.subTotal + item.subTotal }
  ), 0);

  return { removeSummary: summary, removeTotal: combined.subTotal };
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MENU_FETCH_SUCCESS:
      return {
        ...state,
        menu: action.payload,
      };
    case actionTypes.ADD_TO_ORDER: {
      const { addSummary, addTotal } = performAdd(action.payload,
        state.orderSummary,
        state.menu[action.payload]);
      return {
        ...state,
        orderSummary: addSummary,
        total: addTotal,
      }; }
    case actionTypes.REMOVE_FROM_ORDER: {
      const { removeSummary, removeTotal } = performRemove(action.payload,
        state.orderSummary,
        state.menu[action.payload]);
      return {
        ...state,
        orderSummary: removeSummary,
        total: removeTotal,
      };
    }
    case actionTypes.MENU_DELETE_SUCCESS: {
      delete state.menu[action.payload.id];
      return { ...state };
    }
    default: return { ...state };
  }
};

export default menuReducer;
