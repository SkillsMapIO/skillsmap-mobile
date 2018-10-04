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
      const defaultLoginError = 'Something went wrong';

      dispatch.user.loginRequestStarted();

      try {
        const apiResponse = await api.login(username, password);

        if (apiResponse.ok) {
          dispatch.user.loginRequestSuccess(apiResponse.data);
        } else {
          dispatch.user.loginRequestFailed(apiResponse.data && apiResponse.data.error && defaultLoginError);
        }
      } catch (error) {
        dispatch.user.loginRequestFailed(defaultLoginError);
      }
    },
    async logoutRequest() {
      // In case we want to add more things on logout
      dispatch.user.logoutRequestSuccess();
    },
  }),
});
