import * as activity from './db/activity';
import * as discipline from './db/discipline';
import * as login from './db/login';
import * as medals from './db/medals';
import * as personalGoals from './db/personalGoals';
import * as season from './db/season';
import * as store from './db/store';
import * as summary from './db/summary';
import * as user from './db/user';

export default {
  ...activity,
  ...discipline,
  ...login,
  ...medals,
  ...personalGoals,
  ...season,
  ...store,
  ...summary,
  ...user,
};
