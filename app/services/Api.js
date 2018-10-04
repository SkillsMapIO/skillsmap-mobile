import apisauce from 'apisauce';
import Config from 'react-native-config';

export default (settings) => {
  const api = apisauce.create({
    baseURL: settings.baseUrl,
    headers: settings.jsonHeaders,
    // 10 second timeout...
    timeout: 10000,
  });

  const getEvaluations = () => {
    const authHeader = settings.generateAuthorizationHeader();

    return api.get('/api/school-portal/mobile/users/organisations-with-roles', {}, { headers: authHeader });
  };

  const getEvaluationDetails = (evaluationId) => {
    const qs = { evaluationId };

    return api.get('/api/v1/member', qs);
  };

  const login = (/* username, password */) => {
    const username = Config.TEST_USER_USERNAME;
    const password = Config.TEST_USER__PASSWORD;
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
