import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import { createLogger } from 'redux-logger';

import Models from '../models';
import config from '../config/DebugConfig';
import ReduxPersistConfig from '../config/ReduxPersistConfig';

import { ApiConfig } from '../config/ApiConfig';
import Api from '../services/Api';
import FixtureApi from '../services/FixtureApi';

export default () => {
  const api = config.useFixtures ? FixtureApi() : Api(ApiConfig);
  const middlewares = [];

  /* ------------- Persist Plugin ------------- */
  const persistPlugin = createRematchPersist({
    ...ReduxPersistConfig,
  });

  /* ------------- Logger Middleware ------------- */

  // remove common noise
  const loggingBlacklist = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'];
  if (__DEV__) {
    // silence these saga-based messages
    // create the logger
    const logger = createLogger({
      predicate: (getState, { type }) => {
        const isBlacklisted = loggingBlacklist.includes(type);

        if (isBlacklisted) {
          return false;
        }

        return true;
      },
    });

    middlewares.push(logger);
  }

  /* ------------- Init rematch ------------- */
  const store = init({
    models: Models(api),
    plugins: [persistPlugin],
    redux: {
      middlewares,
    },
  });

  return store;
};
