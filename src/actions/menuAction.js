import BASE_URL from '../constants';
import actionTypes from './actionTypes';

export const fetchMenuAction = () => dispatch => fetch(
  `${BASE_URL}/menu`,
  {
    headers: { 'content-type': 'application/json', Authorization: localStorage.getItem('ff-token') },
  },
).then(res => res.json())
  .then((data) => {
    dispatch({
      type: actionTypes.MENU_FETCH_SUCCESS,
      payload: data,
    });
  });


export const removeFromMenu = id => dispatch => fetch(
  `${BASE_URL}/menu/${id}`,
  {
    method: 'DELETE',
    headers: { 'content-type': 'application/json', Authorization: localStorage.getItem('ff-token') },
  },
).then(res => res.json())
  .then((data) => {
    dispatch({
      type: actionTypes.MENU_DELETE_SUCCESS,
      payload: {
        data,
        id,
      },
    });
  });


export const addToMenu = body => () => fetch(
  `${BASE_URL}/menu`,
  {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: localStorage.getItem('ff-token') },
    body: JSON.stringify(body),
  },
).then(res => res.json())
  .then(() => {
    window.location.reload();
  });


export default fetchMenuAction;
