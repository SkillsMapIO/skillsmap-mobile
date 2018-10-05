import Startup from './Startup';
import Connection from './Connection';
import User from './User';
import Evaluations from './Evaluations';

export default (api) => ({
  user: User(api),
  evaluations: Evaluations(api),
  connection: Connection(),
  startup: Startup(),
});
