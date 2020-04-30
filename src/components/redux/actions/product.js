import axios from 'axios';
import 'dotenv/config';
export const getProducts = (authorization, userId) => {
  return {
    type: 'GET_PRODUCTS',
    payload: axios({
      method: 'GET',
      url: process.env.REACT_APP_URL + '/product',
      headers: {
        authorization: authorization,
        user_id: userId,
      },
    }),
  };
};

export const detailProducts = (category, product, page) => {
  return {
    type: 'DETAILS_PRODUCT',
    payload: axios({
      method: 'GET',
      url:
        process.env.REACT_APP_URL +
        `/product?category=${category}&name=${product}&pages=${page}`,
    }),
  };
};

export const paginateProducts = (event) => {
  return {
    type: 'PAGINATE_PRODUCT',
    payload: axios({
      method: 'GET',
      url: process.env.REACT_APP_URL + `/product?pages=${event}`,
    }),
  };
};

export const deleteProduct = (productId) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios({
      method: 'DELETE',
      url: process.env.REACT_APP_URL + `/product/${productId}`,
    }),
  };
};
export const postProduct = (data) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios({
      method: 'POST',
      url: process.env.REACT_APP_URL + '/product',
      data: data,
    }),
  };
};
export const updateProduct = (productId, data) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: axios({
      method: 'PATCH',
      url: process.env.REACT_APP_URL + `/product/${productId}`,
      data: data,
    }),
  };
};
