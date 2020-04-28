import * as store from './store';
import * as utils from './utils';

import VariableSpec from './store/specs/variableSpec';
import provider, { setup } from './provider';

export * from './store';
export {
  utils, VariableSpec, provider, setup,
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
