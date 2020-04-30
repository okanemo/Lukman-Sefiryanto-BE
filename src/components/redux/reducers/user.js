const initialState = {
  isAuthenticated: false,
  user: [],
  persistLogin: {},
  menu: [],
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        user: action.payload.data.result,
      };
    case 'GET_USER_PENDING':
      return {
        ...state,
      };
    case 'GET_USER_REJECTED':
      return {
        ...state,
      };

    case 'POST_USER_FULFILLED':
      const newDataUser = [...state.user, action.payload.data.result];
      return {
        ...state,
        user: newDataUser,
      };
    case 'POST_USER_PENDING':
      return {
        ...state,
      };
    case 'POST_USER_REJECTED':
      return {
        ...state,
      };
    case 'UPDATE_USER_PENDING':
      return {
        ...state,
      };
    case 'UPDATE_USER_REJECTED':
      return {
        ...state,
      };
    case 'UPDATE_USER_FULFILLED':
      console.log(action.payload);
      const newUserAfterUpdate = state.user.map((user) => {
        if (user.id === action.payload.data.result.id) {
          return action.payload.data.result;
        }

        return user;
      });
      return {
        ...state,
        user: newUserAfterUpdate,
      };
    case 'DELETE_USER_FULFILLED':
      const newDataAfterDelete = state.user.filter(
        (user) => user.id !== action.payload.data.result
      );
      return {
        ...state,
        user: newDataAfterDelete,
      };
    case 'DELETE_USER_PENDING':
      return {
        ...state,
      };
    case 'DELETE_USER_REJECTED':
      return {
        ...state,
      };
    case 'UPDATE_MENU_PENDING':
      return {
        ...state,
      };
    case 'UPDATE_MENU_REJECTED':
      return {
        ...state,
      };
    case 'UPDATE_MENU_FULFILLED':
      console.log(action.payload);
      const newmenuAfterUpdate = state.menu.map((menu) => {
        if (menu.id === action.payload.data.result.id) {
          return action.payload.data.result;
        }

        return menu;
      });
      return {
        ...state,
        menu: newmenuAfterUpdate,
      };
    case 'GET_MENU_FULFILLED':
      return {
        ...state,
        menu: action.payload.data.result,
      };
    case 'GET_MENU_PENDING':
      return {
        ...state,
      };
    case 'GET_MENU_REJECTED':
      return {
        ...state,
      };

    //

    default:
      return state;
  }
};

export default user;
