import { SpecsState, SpecActionTypes, DEFINE_SPEC } from './types';
import VariableSpec from './variableSpec';

const initialState: SpecsState = {
  var: VariableSpec,
};

const componentsReducer = (
  state: SpecsState = initialState,
  action: SpecActionTypes,
): SpecsState => {
  switch (action.type) {
    case DEFINE_SPEC: {
      const spec = action.payload;
      if (state[spec.name] != null) throw new Error('Component spec is already defined.');
      return {
        ...state,
        [spec.name]: { ...spec },
      };
    }
    default:
      return state;
  }
};

export default componentsReducer;
