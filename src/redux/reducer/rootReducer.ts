import { combineReducers } from 'redux';

import clientReducer from './clientReducer';
import statusReducer from './status';

const rootReducer = combineReducers({
  client: clientReducer,
  status: statusReducer,
});

export default rootReducer;
