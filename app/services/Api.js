import apisauce from 'apisauce';

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

  const login = (username, password) => {
    const body = { username, password };

    return api.get('/login', body);
  };

  return {
    getEvaluations,
    getEvaluationDetails,
    login,
  };
};
