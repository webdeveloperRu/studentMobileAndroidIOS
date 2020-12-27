import {createStore, combineReducers, applyMiddleware} from 'redux';
import {userReducer} from './reducers/userReducer';
import {libraryReducer} from './reducers/libraryReducer';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const rootReducer = combineReducers({
  user: userReducer,
  library: libraryReducer,
});

const persistConfig = {
  key: 'studentVideoApp',
  storage: AsyncStorage,
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
