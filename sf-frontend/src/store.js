import createStore from 'storeon';
import persistState from '@storeon/localstorage';
import crossTab from '@storeon/crosstab';
import partners from './Partners/reducer';
import users from './Users/reducer';

export default createStore([
  partners,
  users,
  typeof window !== 'undefined'
    && persistState([], { key: 'sf.myataofficial.com' }),
  /* eslint-disable global-require */
  process.env.NODE_ENV !== 'production' && require('storeon/devtools/logger'),
  typeof window !== 'undefined' && crossTab(),
]);
