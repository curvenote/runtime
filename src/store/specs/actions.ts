import {
  SpecActionTypes,
  DefineSpecProperty,
  DefineSpecEvent,
  DEFINE_SPEC,
  Spec,
  DefineSpec,
} from './types';
import { AppThunk } from '../types';
import { getSpec } from './selectors';
import { getSpecFromDefinition } from './utils';

export function defineSpec(spec: Spec): SpecActionTypes {
  return {
    type: DEFINE_SPEC,
    payload: { ...spec },
  };
}

export function createSpec(
  name: string | DefineSpec,
  properties?: Record<string, DefineSpecProperty>,
  events?: Record<string, DefineSpecEvent>,
  description: string = '',
): AppThunk<Spec> {
  return (dispatch, getState) => {
    if (typeof name === 'object') {
      const spec = getSpecFromDefinition(name);
      dispatch(defineSpec(spec));
    } else {
      const spec = getSpecFromDefinition({
        name, properties, events, description,
      } as DefineSpec);
      dispatch(defineSpec(spec));
    }
    return getSpec(getState(), typeof name === 'object' ? name.name : name) as Spec;
  };
}
