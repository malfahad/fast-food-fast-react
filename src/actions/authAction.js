
import actionTypes from './actionTypes';
import { BASE_URL } from '../constants/index';

const authAction = (path, payload) => (dispatch) => {
  const url = `${BASE_URL}/auth/${path}`;
  const isAdmin = path.includes('admin');

  return fetch(url, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(
      (data) => {
        if (data.authorization) {
          dispatch({
            type: actionTypes.AUTH_SUCCESS,
            payload: data.authorization,
            isAdmin,
          });
        } else {
          dispatch({
            type: actionTypes.AUTH_FAILED,
            payload: data.error,
            isAdmin,
          });
        }
      },
    );
};

export default authAction;
