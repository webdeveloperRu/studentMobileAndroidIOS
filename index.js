/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {RootSiblingParent} from 'react-native-root-siblings';
import {name as appName} from './app.json';
const Redux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootSiblingParent>
        <App />
      </RootSiblingParent>
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Redux);
