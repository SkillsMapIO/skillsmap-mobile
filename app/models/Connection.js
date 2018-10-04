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
