import * as ActionTypes from '../actions/types';

const initialState = {
  data: null,
  token: null,
  emailCode: '',
  loginUserEmail: '',
  loginUserPassword: '',
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
    case ActionTypes.REGISTER_EMAILCODE:
      const emailCode = action.payload;
      return {
        ...state,
        emailCode: emailCode,
      };
    case ActionTypes.SET_LOGINUSEREMAIL:
      const loginUserEmail = action.payload;
      return {
        ...state,
        loginUserEmail: loginUserEmail,
      };
    case ActionTypes.SET_LOGINUSERPASSWORD:
      const loginUserPassword = action.payload;
      return {
        ...state,
        loginUserPassword: loginUserPassword,
      };

    default:
      return state;
  }
};
