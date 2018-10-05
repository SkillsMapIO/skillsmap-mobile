const defaultState = Object.freeze({
  evaluationDetails: {},
});

export default (api) => ({
  state: { ...defaultState },
  reducers: {
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
  effects: () => ({
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
  }),
});
