import apiUrl from './baseURL';
const API_URL = apiUrl.API_URL;
export const loginUser = async (user) => {
  return fetch(API_URL + 'auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      otp: user.otp,
    }),
  });
};
export const registerUser = async (user) => {
  return fetch(API_URL + 'auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    }),
  });
};

export const getMyProducts = async (token) => {
  return fetch(API_URL + 'student/my-products?demo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: token,
    },
  });
};

export const getCategories = async (product_id, token) => {
  return fetch(API_URL + 'student/' + product_id + '/categories?demo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: token,
    },
  });
};

export const getLessons = async (category_id, token) => {
  return fetch(API_URL + 'student/' + category_id + '/lessons?demo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: token,
    },
  });
};

export const getComments = async (lesson_id, token) => {
  return fetch(API_URL + 'student/' + lesson_id + '/comments?demo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: token,
    },
  });
};

export const saveProfile = async (user, token) => {
  let FormData = require('form-data');

  let formdata = new FormData();
  let filename = '';
  let file = null;
  if (user.avatar != null) {
    filename = user.avatar.path.replace(/^.*[\\\/]/, '');
    file = {uri: user.avatar.path, type: 'multipart/form-data', name: filename};
  }
  formdata.append('email', user.email);
  formdata.append('name', user.name);
  formdata.append('time_zone', user.time_zone);
  formdata.append('avatar', file);
  return fetch(API_URL + 'auth/settings', {
    method: 'POST',
    headers: {
      apikey: token,
    },
    body: formdata,
  });
};

export const removeAvatar = async (token) => {
  return fetch(API_URL + 'auth/settings/avatar', {
    method: 'DELETE',
    headers: {
      apikey: token,
    },
  });
};
export const changePassword = async (password, token) => {
  return fetch(API_URL + 'auth/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: token,
    },
    body: JSON.stringify({
      current_password: password.current_password,
      new_password: password.new_password,
      verify_password: password.verify_password,
    }),
  });
};

export const forgotPassword = async (email) => {
  return fetch(API_URL + 'auth/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const resetPassword = async (resetInformation) => {
  return fetch(API_URL + 'auth/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: resetInformation.email,
      newpassword: resetInformation.password,
      'email-code': resetInformation.emailCode,
    }),
  });
};

export const getSettings = async (token) => {
  return fetch(API_URL + 'auth/settings', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: token,
    },
  });
};

export const getTwofaKey = async (token) => {
  return fetch(API_URL + 'auth/twofa', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: token,
    },
  });
};

export const setTwofaKey = async (otpCode, token) => {
  return fetch(API_URL + 'auth/twofa', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      apikey: token,
    },
    body: JSON.stringify({
      otp: otpCode,
    }),
  });
};

export const disableTwoFaKey = async (otpCode, token) => {
  return fetch(API_URL + 'auth/twofa?otp=' + otpCode, {
    method: 'DELETE',
    headers: {
      apikey: token,
    },
  });
};

export const markAsDone = async (param, lesson_id, token) => {
  return fetch(API_URL+'student/' + lesson_id + '/mark-as-complete/' + param, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'apikey': token
    },
  })
}

export const addComment = async (comment, lesson_id, token) => {
  return fetch(API_URL+'student/' + lesson_id + '/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': token
    },
    body: JSON.stringify({
      comment: comment
    })
  })
}

export const getDownloadFiles = async (lesson_id, token) => {
  return fetch(API_URL+'student/' + lesson_id + '/files', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': token
    }
  })
}