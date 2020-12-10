import * as ActionTypes from '../actions/types';

const initialState = {
  productList: [],
  categoryList: [],
  lessonList: {},
  currentProduct: [],
  currentLesson: [],
  currentCategory: [],
  totalLessons: 0,
};

export const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_PRODUCTS:
      const products = action.payload;
      return {
        ...state,
       productList: products,
      };

    case ActionTypes.REGISTER_CATEGORIES:
      const categories = action.payload;
      return {
        ...state,
        categoryList: categories,
      };

    case ActionTypes.SET_CURRENT_PRODUCT:
      const product = action.payload;
      return {
        ...state,
        currentProduct: product
      };

    case ActionTypes.REGISTER_LESSONS:
        const  {lessons,category_id} = action.payload;
        state.lessonList[category_id] = lessons
        return {
          ...state,
          lessonList: state.lessonList,
        };
    case ActionTypes.REGISTER_TOTAL_LESSONS:
      const  totalLessons = action.payload;
        state.lessonList[category_id] = lessons
        return {
          ...state,
          totalLessons: totalLessons,
        };
    case ActionTypes.SET_CURRENT_LESSON:
      const currentLesson = action.payload;
        return {
          ...state,
          currentLesson: currentLesson,
        };
  case ActionTypes.SET_CURRENT_CATEGORY:
    const currentCategory = action.payload;
      return {
        ...state,
        currentCategory: currentCategory,
      };    
    case ActionTypes.CLEAR_ALL:
      return {
        ...state,
        productList: [],
        categoryList: [],
        lessonList: {},
        currentProduct: [],
        currentLesson: [],
        currentCategory: [],
        totalLessons: 0,
      };

    default:
      return state;
  }
};


