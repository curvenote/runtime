import * as store from './store';
import * as utils from './utils';

import VariableSpec from './store/specs/variableSpec';
import provider, { setup, Provider } from './provider';

export * from './store';
export {
  utils, VariableSpec, provider, Provider, setup,
};
export * from './constants';

const runtime = {
  ...store,
  utils,
  VariableSpec,
  provider,
  setup,
};

export default runtime;
