/* eslint-disable import/prefer-default-export */
const defaultState = Object.freeze({
  id: null,
  username: null,
  organizationId: null,
  loggingIn: false,
  loginError: null,
});

export default (api) => ({
  state: { ...defaultState },
  reducers: {
    loginRequestStarted(state) {
      return { ...state, loggingIn: true };
    },
    loginRequestSuccess(state, { id, username, organizationId }) {
      return {
        ...state,
        loggingIn: false,
        loginError: null,
        id,
        username,
        organizationId,
      };
    },
    loginRequestFailed(state, payload) {
      return { ...state, ...defaultState, loginError: payload };
    },
    logoutRequestSuccess(state) {
      return { ...state, ...defaultState };
    },
  },
  effects: (dispatch) => ({
    async loginRequest({ username, password }) {
      dispatch.user.loginRequestStarted();

      try {
        const userInfo = await api.login(username, password);
        dispatch.user.loginRequestSuccess(userInfo);
      } catch (error) {
        dispatch.user.loginRequestFailed(error);
      }
    },
    async logoutRequest() {
      // In case we want to add more things on logout
      dispatch.user.logoutRequestSuccess();
    },
  }),
});
