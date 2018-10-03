import { init } from '@rematch/core';
import SelectPlugin from '@rematch/select';

import Models from '../models';
import config from '../config/DebugConfig';
import { ApiConfig } from '../config/ApiConfig';
import Api from '../services/Api';
import FixtureApi from '../services/FixtureApi';

export default () => {
  const api = config.useFixtures ? FixtureApi() : Api(ApiConfig);
  const store = init({
    models: Models(api),
    plugins: [SelectPlugin()],
  });

  return store;
};
