import * as ActionTypes from '../actions/types';

const initialState = {
  user: null,
  token: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_USER:
      const registerUser = action.payload;
      return {
        ...state,
       data: registerUser,
       token: null,
      };
    case ActionTypes.LOG_OUT:
      return {
        ...state,
        data: null,
        token: null,
      };
    case ActionTypes.LOGIN_USER:
        const loginUser = action.payload;
        return {
          ...state,
          data: loginUser.data,
          token: loginUser.token,
        };
          
    default:
      return state;
  }
};
