import * as ActionTypes from './types';
export const registerToken = (token) => {
  return {
    type: ActionTypes.REGISTER_TOKEN,
    payload: token,
  };
};

export const registerUser = (userInfo) => {
  return {
    type: ActionTypes.REGISTER_USER,
    payload: userInfo,
  };
};

export const loginUser = (userInfo) => {
  return {
    type: ActionTypes.LOGIN_USER,
    payload: userInfo,
  };
};



export const logOut = () => {
  return {
    type: ActionTypes.LOG_OUT,
  };
};
