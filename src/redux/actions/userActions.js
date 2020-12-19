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

export const registerEmailCode = (emailCode)=> {
  return{
    type: ActionTypes.REGISTER_EMAILCODE,
    payload: emailCode
  }
}

export const setLoginUserEmail = (loginUserEmail) => {
  return {
    type: ActionTypes.SET_LOGINUSEREMAIL,
    payload: loginUserEmail,
  };
};


export const setLoginUserPassword = (loginUserPassword) => {
  return {
    type: ActionTypes.SET_LOGINUSERPASSWORD,
    payload: loginUserPassword,
  };
};
