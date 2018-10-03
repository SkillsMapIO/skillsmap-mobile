/* eslint-disable import/prefer-default-export */
const defaultState = Object.freeze({
  startedAt: null,
  loading: true,
  startupCounter: 0,
  resumeCounter: 0,
});

export default () => ({
  state: { ...defaultState },
  reducers: {
    isStarting(state) {
      return { ...state, startedAt: Date.now(), loading: true };
    },
    doneStarting(state) {
      return { ...state, loading: false };
    },
    incrementStartupCounter(state) {
      return { ...state, startupCounter: state.startupCounter + 1 };
    },
    incrementResumeCounter(state) {
      return { ...state, resumeCounter: state.resumeCounter + 1 };
    },
  },
  effects: (dispatch) => ({
    async starting() {
      dispatch.isStarting();
      dispatch.incrementStartupCounter();
      // We will fire more things here like data loading
    },
    async resuming() {
      dispatch.incrementResumeCounter();
    },
  }),
});
