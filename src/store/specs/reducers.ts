import { SpecsState, SpecActionTypes, DEFINE_SPEC } from './types';
import InkVarSpec from './varSpec';

const initialState: SpecsState = {
  var: InkVarSpec,
};

const componentsReducer = (
  state: SpecsState = initialState,
  action: SpecActionTypes,
): SpecsState => {
  switch (action.type) {
    case DEFINE_SPEC: {
      const spec = action.payload;
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
