import { combineReducers } from 'redux';

import login from './login';
import isLoading from './is-loading';

const rootReducer = combineReducers({
  login,
  isLoading
})

export default rootReducer
