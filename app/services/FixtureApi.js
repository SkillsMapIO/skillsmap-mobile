import Config from 'react-native-config';

function wrapFixtureOnPromiseWithDelay(response, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Object.assign({}, response)), delay);
  });
}

export default (settings) => ({
  settings,
  getEvaluations: () => {
    let data = {};

    if (__DEV__) {
      data = require('./fixtures/evaluations-index.json');
    }

    return wrapFixtureOnPromiseWithDelay({ ok: true, data }, 200);
  },
  getEvaluationDetails: () => {
    let data = {};

    if (__DEV__) {
      data = require('./fixtures/evaluation-details.json');
    }

    return wrapFixtureOnPromiseWithDelay({ ok: true, data }, 200);
  },
  login: () => {
    const token = Config.TEST_FIXTURE_TOKEN;


    if (!token) {
      console.error('Test token missing'); // eslint-disable-line no-console

      throw new Error('Missing test token');
    }

    return wrapFixtureOnPromiseWithDelay({ ok: true, data: { token } }, 1000);
  },
});
