// import { createStore, applyMiddleware, compose } from 'redux';
// import { createLogger } from 'redux-logger';
// import { persistStore, persistReducer } from 'redux-persist';
// import createSagaMiddleware from 'redux-saga';

// import ReduxPersistConfig from '../config/ReduxPersistConfig';

// // creates the store
// export default (rootReducer, rootSaga) => {
//   /* ------------- Redux Configuration ------------- */

//   const middleware = [];
//   const enhancers = [];

//   /* ------------- Saga Middleware ------------- */

//   const sagaMiddleware = createSagaMiddleware();
//   middleware.push(sagaMiddleware);

//   /* ------------- Logger Middleware ------------- */

//   // remove common noise
//   const loggingBlacklist = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'];
//   if (__DEV__) {
//     // silence these saga-based messages
//     // create the logger
//     const logger = createLogger({
//       predicate: (getState, { type }) => {
//         const isBlacklisted = loggingBlacklist.includes(type);

//         if (isBlacklisted) {
//           return false;
//         }

//         const state = getState();
//         const reduxLogEnabled = state.settings && state.settings.reduxLog;

//         return reduxLogEnabled;
//       },
//     });

//     middleware.push(logger);
//   }

//   /* ------------- Assemble Middleware ------------- */

//   enhancers.push(applyMiddleware(...middleware));

//   const persistedReducer = persistReducer(ReduxPersistConfig, rootReducer);
//   const store = createStore(persistedReducer, compose(...enhancers));
//   const persistor = persistStore(store);

//   // kick off root saga
//   sagaMiddleware.run(rootSaga);

//   return { store, persistor };
// };
