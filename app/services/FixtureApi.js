function wrapFixtureOnPromiseWithDelay(response, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Object.assign({}, response)), delay);
  });
}

export default () => ({
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
    const data = {
      id: '5a4ef699017eb992b3161db4',
      username: 'gabceb',
      organizationId: '5a32cfaa94aa073598a57797',
    };

    return wrapFixtureOnPromiseWithDelay({ ok: true, data }, 1000);
  },
});
