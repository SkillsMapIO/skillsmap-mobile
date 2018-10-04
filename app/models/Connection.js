/* eslint-disable import/prefer-default-export */
import { NetInfo } from 'react-native';

export default () => ({
  state: { isConnected: true },
  reducers: {
    setIsConnected(state, payload) {
      return { ...state, isConnected: payload };
    },
  },
  effects: (dispatch) => ({
    async loadIsConnected() {
      const isConnected = await NetInfo.isConnected.fetch();
      dispatch.connection.setIsConnected(isConnected);
    },
  }),
});

/*

*********** What the same code looks like with redux duck pattern + sagas *************

const actionsPrefix = 'connection';
const SET_IS_CONNECTED = `${actionsPrefix}/SET_IS_CONNECTED`;
const LOAD_IS_CONNECTED = `${actionsPrefix}/LOAD_IS_CONNECTED`;
export const defaultState = Object.freeze({
  isConnected: true,
});
export default function reducer(state = defaultState, action) {
  const { type, data } = action;
  switch (type) {
    case SET_IS_CONNECTED:
      return { ...state, isConnected: data.isConnected };
    default:
      return state;
  }
}
export const setIsConnected = (isConnected) => ({ type: SET_IS_CONNECTED, data: { isConnected } });
export const loadIsConnected = () => ({ type: LOAD_IS_CONNECTED });
export function* loadIsConnectedSaga() {
  const connectionStatus = yield call(NetInfo.isConnected.fetch);
  yield put(setIsConnected(connectionStatus));
}
export function sagas() {
  return {
    loadIsConnected: function* loadIsConnectedGen() { yield takeLatest(LOAD_IS_CONNECTED, loadIsConnectedSaga); },
  };
}
// Selectors
const get = (state) => state.connection;
export const isConnectedSelector = createSelector(get, ({ isConnected }) => isConnected);

*/
