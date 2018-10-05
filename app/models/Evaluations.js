/* eslint-disable import/prefer-default-export */
const defaultState = Object.freeze({
  evaluationsData: null,
  loading: false,
  requestError: null,
});

export default (api) => ({
  state: { ...defaultState },
  reducers: {
    evaluationsRequestStarted(state) {
      return { ...state, loading: true };
    },
    evaluationsRequestSuccess(state, { evaluationsData }) {
      return {
        ...state,
        loading: false,
        requestError: null,
        evaluationsData,
      };
    },
    evaluationsRequestFailed(state, payload) {
      return { ...state, ...defaultState, requestError: payload };
    },
  },
  effects: {
    async evaluationsRequest() {
      const defaultError = 'Something went wrong while requesting evaluations';

      this.evaluationsRequestStarted();

      try {
        const apiResponse = await api.getEvaluations();

        if (apiResponse.ok) {
          const evaluationsData = apiResponse.data;
          this.evaluationsRequestSuccess({ evaluationsData });
        } else {
          this.evaluationsRequestFailed(apiResponse.data && apiResponse.data.error && defaultError);
        }
      } catch (error) {
        this.evaluationsRequestFailed(defaultError);
      }
    },
  },
  selectors: {
    evaluationsDataSelector() {
      return (rootState) => rootState.evaluations.evaluationsData;
    },
  },
});
