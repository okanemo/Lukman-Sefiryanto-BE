const initialState = {
  products: [],
  paginate: [],
  order: [],
  message: '',
};
const product = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_FULFILLED':
      // console.log('paginatedsd', action.payload);
      return {
        ...state,
        products: action.payload.data.result,
        paginate: action.payload.data.paginate,
        message: action.payload.data.status,
      };
    case 'GET_PRODuCTS':
      return {
        ...state,
        message: action.payload.data.status,
      };
    case 'GET_PRODUCT_PENDING':
      return {
        ...state,
      };
    case 'GET_PRODUCT_REJECTED':
      return {
        ...state,
      };
    case 'GET_ORDER_FULFILLED':
      return {
        ...state,
        order: action.payload.data.result,
      };
    case 'GET_ORDER_PENDING':
      return {
        ...state,
      };
    case 'GET_ORDER_REJECTED':
      return {
        ...state,
      };

    case 'DETAILS_PRODUCT_FULFILLED':
      return {
        ...state,
        products: action.payload.data.result,
      };
    case 'DETAILS_PRODUCT_PENDING':
      return {
        ...state,
      };
    case 'DETAILS_PRODUCT_REJECTED':
      return {
        ...state,
      };

    case 'PAGINATE_PRODUCT_FULFILLED':
      return {
        ...state,
        products: action.payload.data.result,
      };

    case 'DELETE_PRODUCT_FULFILLED':
      const newDataAfterDelete = state.products.filter(
        (product) => product.id !== action.payload.data.result
      );
      return {
        ...state,
        products: newDataAfterDelete,
      };
    case 'DELETE_PRODUCT_PENDING':
      return {
        ...state,
      };
    case 'DELETE_PRODUCT_REJECTED':
      return {
        ...state,
      };

    case 'POST_PRODUCT_FULFILLED':
      const newDataProduct = [...state.products, action.payload.data.result];
      return {
        ...state,
        products: newDataProduct,
      };
    case 'POST_PRODUCT_PENDING':
      return {
        ...state,
      };
    case 'POST_PRODUCT_REJECTED':
      return {
        ...state,
      };

    case 'UPDATE_PRODUCT_PENDING':
      return {
        ...state,
      };
    case 'UPDATE_PRODUCT_REJECTED':
      return {
        ...state,
      };
    case 'UPDATE_PRODUCT_FULFILLED':
      console.log(action.payload);
      const newProductAfterUpdate = state.products.map((product) => {
        if (product.id === action.payload.data.result.id) {
          return action.payload.data.result;
        }

        return product;
      });
      return {
        ...state,
        products: newProductAfterUpdate,
      };
    case 'GET_PAGINATE_FULFILLED':
      return {
        ...state,
        products: action.payload.data.paginate,
      };

    default:
      return state;
  }
};

export default product;
