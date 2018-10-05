import apisauce from 'apisauce';
import Config from 'react-native-config';

const generateAuthorizationHeader = (userToken) => ({ Authorization: `Bearer ${userToken}` });

export default (settings) => {
  const api = apisauce.create({
    baseURL: settings.baseUrl,
    headers: settings.jsonHeaders,
    // 10 second timeout...
    timeout: 10000,
  });

  const getEvaluations = (token, userId) => {
    const authHeader = generateAuthorizationHeader(token);

    return api.get(`/skillz/users/${userId}/evaluations`, {}, { headers: authHeader });
  };

  const getEvaluationDetails = (token, evaluationId) => {
    const authHeader = generateAuthorizationHeader(token);

    return api.get(`/skillz/evaluations/${evaluationId}`, {}, { headers: authHeader });
  };

  const login = (/* username, password */) => {
    const username = Config.TEST_USER_USERNAME;
    const password = Config.TEST_USER__PASSWORD;

    if (!username || !password) {
      const error = 'Missing TEST_USER_USERNAME and TEST_USER__PASSWORD from .env file';
      console.error(error); // eslint-disable-line no-console

      throw new Error(error);
    }

    const body = { username, password };

    return api.post('/skillz/mobile-app/test-user-token', body);
  };

  return {
    getEvaluations,
    getEvaluationDetails,
    login,
    settings,
  };
};
