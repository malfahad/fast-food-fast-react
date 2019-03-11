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

export default fetchMenuAction;
