import Startup from './Startup';
import Connection from './Connection';
import User from './User';

export default (api) => ({
  user: User(api),
  connection: Connection(),
  startup: Startup(),
});
