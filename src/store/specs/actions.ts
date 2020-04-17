import {
  SpecActionTypes,
  DefineComponentPropertySpec,
  DefineComponentEventSpec,
  DEFINE_SPEC,
  ComponentSpec,
} from './types';
import { AppThunk } from '../types';
import { getSpec } from './selectors';
import { getSpecFromDefinition } from './utils';


export function defineComponentSpec(componentSpec: ComponentSpec): SpecActionTypes {
  return {
    type: DEFINE_SPEC,
    payload: { ...componentSpec },
  };
}

export function createComponentSpec(
  name: string,
  properties: Record<string, DefineComponentPropertySpec>,
  events: Record<string, DefineComponentEventSpec>,
  description: string = '',
): AppThunk<ComponentSpec> {
  return (dispatch, getState) => {
    if (getSpec(getState(), name) != null) throw new Error('Component spec is already defined.');
    const spec = getSpecFromDefinition({
      name, properties, events, description,
    });
    dispatch(defineComponentSpec(spec));
    return getSpec(getState(), name) as ComponentSpec;
  };
}
