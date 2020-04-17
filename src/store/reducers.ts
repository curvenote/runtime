import { combineReducers } from 'redux';
import specs from './specs/reducers';
import variables from './variables/reducers';
import components from './components/reducers';

export default combineReducers({
  specs,
  variables,
  components,
});
