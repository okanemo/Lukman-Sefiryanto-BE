import axios from 'axios';
import 'dotenv/config';
export const addCart = (data) => {
  return {
    type: 'ADD_CART_DATA',
    payload: data,
  };
};

export const deleteCart = (data) => {
  return {
    type: 'DELETE_CART_DATA',
    payload: data,
  };
};

export const addQty = (id) => {
  return {
    type: 'ADD_QTY',
    payload: id,
  };
};
export const reduceQty = (id) => {
  return {
    type: 'REDUCE_QTY',
    payload: id,
  };
};
export const chartHistory = () => {
  return {
    type: 'GET_CHART',
    payload: axios({
      method: 'GET',
      url: process.env.REACT_APP_URL + '/order/chart',
    }),
  };
};
export const postOrder = (data) => {
  return {
    type: 'POST_ORDER',
    payload: axios({
      method: 'POST',
      url: process.env.REACT_APP_URL + '/order',
      data: data,
    }),
  };
};
