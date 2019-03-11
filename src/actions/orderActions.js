import actionTypes from './actionTypes';
import BASE_URL from '../constants';

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

export const fetchOrders = () => dispatch => fetch(
  `${BASE_URL}/orders`,
  {
    headers: { 'content-type': 'application/json', Authorization: localStorage.getItem('ff-token') },
  },
)
  .then(res => res.json())
  .then((data) => {
    if (data.data) {
      console.log(data);
    }
  });


export const placeOrder = order => dispatch = fetch(
  `${BASE_URL}/orders`,
  {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'content-type': 'application/json', Authorization: localStorage.getItem('ff-token') },
  },
)
  .then(res => res.json())
  .then((data) => {
    if (data.data) {
      console.log(data);
    }
  });
