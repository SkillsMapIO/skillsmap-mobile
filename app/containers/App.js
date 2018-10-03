import React from 'react';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

import RootContainer from './RootContainer';
import createStore from '../redux';

const store = createStore();

export default () => (
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <RootContainer />
    {/* </PersistGate> */}
  </Provider>
);
