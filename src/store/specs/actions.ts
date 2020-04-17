import {
  SpecActionTypes,
  DefineSpecProperty,
  DefineSpecEvent,
  DEFINE_SPEC,
  Spec,
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
  name: string,
  properties: Record<string, DefineSpecProperty>,
  events: Record<string, DefineSpecEvent>,
  description: string = '',
): AppThunk<Spec> {
  return (dispatch, getState) => {
    if (getSpec(getState(), name) != null) throw new Error('Component spec is already defined.');
    const spec = getSpecFromDefinition({
      name, properties, events, description,
    });
    dispatch(defineSpec(spec));
    return getSpec(getState(), name) as Spec;
  };
}
