/* eslint-disable import/prefer-default-export */
import base64 from 'base-64';

import { storeAuth, fetchAuth, deleteAuth } from '../helpers/Keychain';

const defaultLoggedOutState = Object.freeze({
  id: null,
  username: null,
  organizationId: null,
  token: null,
});

const defaultState = Object.freeze({
  ...defaultLoggedOutState,
  loggingIn: false,
  loginError: null,
});

export default (api) => ({
  state: { ...defaultState },
  reducers: {
    loginRequestStarted(state) {
      return { ...state, loggingIn: true };
    },
    loginRequestSuccess(state) {
      return { ...state, loggingIn: false, loginError: null };
    },
    loginRequestFailed(state, payload) {
      return { ...state, ...defaultState, loginError: payload };
    },
    doneLoadingTokenSuccess(state, { token, decodedToken }) {
      const { id, organizationId, username } = decodedToken;

      return {
        ...state,
        token,
        id,
        organizationId,
        username,
      };
    },
    doneLoadingTokenUnsuccessful(state) {
      return { ...state, ...defaultLoggedOutState };
    },
    logoutRequestSuccess(state) {
      return { ...state, ...defaultLoggedOutState };
    },
  },
  effects: (dispatch) => ({
    async loadToken() {
      const loadTokenRequest = await fetchAuth(api.settings.baseUrl);

      if (loadTokenRequest.ok && loadTokenRequest.credentials) {
        const token = loadTokenRequest.credentials.password;
        const userToken = token.split('.')[1];

        try {
          const decodedTokenStr = base64.decode(userToken);
          const decodedToken = JSON.parse(decodedTokenStr);

          // This does not exist on the current token but should be added
          if (decodedToken.exp) {
            const now = Date.now();
            const isExpired = decodedToken.exp * 1000 < now;

            if (isExpired) {
              await deleteAuth(api.settings.baseUrl);
              dispatch.user.doneLoadingTokenUnsuccessful();

              return;
            }
          }

          dispatch.user.doneLoadingTokenSuccess({ token, decodedToken });

          // TODO: This should not be here. Instead we should listen for doneLoadingTokenSuccess
          // on the startup module or evaluations model and trigger this effect
          // but i dont know how to do it yet
          dispatch.evaluations.evaluationsRequest();
        } catch (err) {
          console.error('Token with bad format received', err); // eslint-disable-line no-console

          await deleteAuth(api.settings.baseUrl);
          dispatch.user.doneLoadingTokenUnsuccessful();
        }
      } else {
        dispatch.user.doneLoadingTokenUnsuccessful();
      }
    },
    async loginRequest({ username, password }) {
      const defaultLoginError = 'Something went wrong';

      dispatch.user.loginRequestStarted();

      try {
        const apiResponse = await api.login(username, password);

        if (apiResponse.ok) {
          const token = apiResponse.data && apiResponse.data.token;

          if (!token) {
            dispatch.user.loginRequestFailed('Token not received');

            return;
          }

          const saveTokenRequest = await storeAuth(api.settings.baseUrl, token);
          if (!saveTokenRequest.ok) {
            throw new Error(saveTokenRequest.error);
          }

          dispatch.user.loadToken();
          dispatch.user.loginRequestSuccess();
        } else {
          dispatch.user.loginRequestFailed((apiResponse.data && apiResponse.data.error) || defaultLoginError);
        }
      } catch (error) {
        console.warn('Login exception', error); // eslint-disable-line no-console
        dispatch.user.loginRequestFailed(defaultLoginError);
      }
    },
    async logoutRequest() {
      await deleteAuth(api.settings.baseUrl);

      // In case we want to add more things on logout
      dispatch.user.logoutRequestSuccess();
    },
  }),
});
