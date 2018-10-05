import Startup from './Startup';
import Connection from './Connection';
import User from './User';
import Evaluations from './EvaluationsGabceb';

export default (api) => ({
  evaluations: Evaluations(api),
  user: User(api),
  connection: Connection(),
  startup: Startup(),
});
