import * as ActionTypes from './types';

export const registerProducts = (products) => {
  return {
    type: ActionTypes.REGISTER_PRODUCTS,
    payload: products,
  };
};
export const registerCategories = (categoies) => {
  return {
    type: ActionTypes.REGISTER_CATEGORIES,
    payload: categoies,
  };
};
export const registerLessons = (lessons, category_id) => {
  return {
    type: ActionTypes.REGISTER_LESSONS,
    payload: {lessons,category_id}
  };
};
export const registerTotalLessons = (totalLessons) => {
  return {
    type: ActionTypes.REGISTER_TOTAL_LESSONS,
    payload: totalLessons
  };
};
export const setCurrentProduct = (product) => {
  return {
    type: ActionTypes.SET_CURRENT_PRODUCT,
    payload: product,
  };
};
export const setCurrentCategory = (category) => {
  return {
    type: ActionTypes.SET_CURRENT_CATEGORY,
    payload: category,
  };
};
export const setCurrentLesson = (lesson) => {
  return {
    type: ActionTypes.SET_CURRENT_LESSON,
    payload: lesson,
  };
};
export const registerComments = (comments) => {
  return {
    type: ActionTypes.REGISTER_COMMENTS,
    payload: comments,
  };
};
export const setFullScreen = (fullscreen) => {
  return {
    type: ActionTypes.SET_FULLSCREEN,
    payload: fullscreen,
  };
};
export const clearAll = () => {
  return {
    type: ActionTypes.CLEAR_ALL,
  };
};