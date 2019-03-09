import actionTypes from './actionTypes';

export const addToOrder = itemId => dispatch => (
  dispatch({
    type: actionTypes.ADD_TO_ORDER,
    payload: itemId,
  })
);
export const removeFromOrder = itemId => dispatch => (
  dispatch({
    type: actionTypes.REMOVE_FROM_ORDER,
    payload: itemId,
  })
);
