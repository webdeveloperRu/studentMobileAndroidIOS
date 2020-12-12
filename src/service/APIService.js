import apiUrl from './baseURL'
const API_URL = apiUrl.API_URL
export const loginUser = async (user) => {
  return fetch(API_URL+'auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',    
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      otp: user.otp
    }),
  })
  
};

export const registerUser = async (user) => {
  return fetch(API_URL+'auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',    
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    }),
  })
 };

export const getMyProducts = async (token) => {
  return fetch(API_URL+'student/my-products?demo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': token
    },
  })
};


export const getCategories = async (product_id, token) => {
  return fetch(API_URL+'student/'+product_id+'/categories?demo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': token
    },
  })
};

export const getLessons = async (category_id, token) => {
  return fetch(API_URL+'student/'+category_id+'/lessons?demo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': token
    },
  })
};

export const getComments = async (lesson_id, token) => {
  return fetch(API_URL+'student/'+lesson_id+'/comments?demo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': token
    },
  })
};