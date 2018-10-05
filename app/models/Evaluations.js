/* eslint-disable import/prefer-default-export */
const defaultState = Object.freeze({
  evaluationsData: null,
  loading: false,
  requestError: null,
  evaluationDetails: {},
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
    fetchEvaluationDetailsStarted(state, { id }) {
      const currentEvaluation = state.evaluationDetails[id] || {};
      currentEvaluation.loading = true;

      return { ...state, evaluationDetails: { ...state.evaluationDetails, [id]: { ...currentEvaluation } } };
    },
    fetchEvaluationDetailsFailed(state, { id, error }) {
      const currentEvaluation = state.evaluationDetails[id] || {};
      currentEvaluation.error = error;

      return { ...state, evaluationDetails: { ...state.evaluationDetails, [id]: { ...currentEvaluation, loading: false } } };
    },
    fetchEvaluationDetailsSuccess(state, { id, evaluation }) {
      state.evaluationDetails[id] = evaluation;

      return { ...state, evaluationDetails: { ...state.evaluationDetails } };
    },
  },
  effects: {
    async evaluationsRequest(payload, { user }) {
      const defaultError = 'Something went wrong while requesting evaluations';
      const { token, id } = user;

      if (!token) {
        return;
      }

      this.evaluationsRequestStarted();

      try {
        const apiResponse = await api.getEvaluations(token, id);

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
    async fetchEvaluationDetails({ id }, { user }) {
      this.fetchEvaluationDetailsStarted({ id });

      try {
        const apiResponse = await api.getEvaluationDetails(user.token, id);

        if (!apiResponse.ok) {
          const error = 'Something went wrong while fetching the evaluation';

          throw new Error(error);
        }

        const evaluation = apiResponse.data;

        if (!evaluation) {
          const error = 'No data received for the evaluation';

          throw new Error(error);
        }

        this.fetchEvaluationDetailsSuccess({ id, evaluation });
      } catch (error) {
        console.warn('Fetching evaluation exception', error.message); // eslint-disable-line no-console
        this.fetchEvaluationDetailsFailed({ id, error: error.message });
      }
    },
  },
  selectors: {
    evaluationsDataSelector() {
      return (rootState) => rootState.evaluations.evaluationsData;
    },
  },
});
