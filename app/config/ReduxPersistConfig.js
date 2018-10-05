import storage from 'redux-persist/lib/storage';
import { createFilter } from 'redux-persist-transform-filter';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import DebugConfig from './DebugConfig';

const saveStartupFilter = createFilter('startup', ['startupCounter', 'resumeCounter']);

const REDUX_PERSIST_CONFIG = {
  debug: DebugConfig.reduxPersistDebug,
  key: 'skillsmap.mobile',
  version: '1',
  storage,
  whitelist: ['startup'],
  transforms: [saveStartupFilter],
  stateReconciler: autoMergeLevel2,
};

export default REDUX_PERSIST_CONFIG;
