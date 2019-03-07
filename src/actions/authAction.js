
import actionTypes from './actionTypes';
import { BASE_URL } from '../constants/index';

const authAction = (isLogin, payload) => (dispatch) => {
  const url = isLogin ? `${BASE_URL}/auth/login` : `${BASE_URL}/auth/register`;

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
          });
        } else {
          dispatch({
            type: actionTypes.AUTH_FAILED,
            payload: data.error,
          });
        }
      },
    );
};

export default authAction;
