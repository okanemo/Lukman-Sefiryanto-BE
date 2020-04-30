const initialState = {
  isAuthenticated: false,
  persistLogin: {},
};

const authpersist = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_PENDING':
      return {
        ...state,
        isAuthenticated: false,
        persistLogin: {},
      };
    case 'LOGIN_USER_REJECTED':
      return {
        ...state,
        isAuthenticated: false,
        persistLogin: {},
      };
    case 'LOGIN_USER_FULFILLED':
      return {
        ...state,
        isAuthenticated: true,
        persistLogin: action.payload.data,
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        isAuthenticated: false,
        persistLogin: {},
      };
    default:
      return state;
  }
};

export default authpersist;
