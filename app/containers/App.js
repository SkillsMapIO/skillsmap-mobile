import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { getPersistor } from '@rematch/persist';

import RootContainer from './RootContainer';
import createStore from '../redux';

const store = createStore();
const persistor = getPersistor();

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RootContainer />
    </PersistGate>
  </Provider>
);
