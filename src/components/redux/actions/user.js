import axios from 'axios';
import 'dotenv/config';
export const login = (data) => {
  return {
    type: 'LOGIN_USER',
    payload: axios({
      method: 'POST',
      url: process.env.REACT_APP_URL + '/user/login',
      data: data,
    }),
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT_USER',
  };
};
export const getUser = (authorization, userId) => {
  return {
    type: 'GET_USER',
    payload: axios({
      method: 'GET',
      url: process.env.REACT_APP_URL + '/user',
      headers: {
        authorization: authorization,
        user_id: userId,
      },
    }),
  };
};
export const postUser = (data) => {
  return {
    type: 'POST_USER',
    payload: axios({
      method: 'POST',
      url: process.env.REACT_APP_URL + '/user/register',
      data: data,
    }),
  };
};
export const updateUser = (userId, data) => {
  return {
    type: 'UPDATE_USER',
    payload: axios({
      method: 'PATCH',
      url: process.env.REACT_APP_URL + `/user/${userId}`,
      data: data,
    }),
  };
};

export const deleteUser = (UserId) => {
  return {
    type: 'DELETE_USER',
    payload: axios({
      method: 'DELETE',
      url: process.env.REACT_APP_URL + `/user/${UserId}`,
    }),
  };
};

export const editMenu = (data, otoritas_id) => {
  return {
    type: 'UPDATE_MENU',
    payload: axios({
      method: 'PATCH',
      url: process.env.REACT_APP_URL + `/user/menu/${otoritas_id}`,
      data: data,
    }),
  };
};
export const getMenu = () => {
  return {
    type: 'GET_MENU',
    payload: axios({
      method: 'GET',
      url: process.env.REACT_APP_URL + '/user/menu',
    }),
  };
};
