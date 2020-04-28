import {
  ComponentsState, Component, ComponentProperty,
} from './types';
import { forEachObject } from '../utils';
import { getSpec } from '../specs/selectors';
import { SpecsState } from '../specs/types';

type State = { runtime: { components: ComponentsState, specs: SpecsState } };

export const getComponent = (state: State, id: string): Component | undefined => (
  state.runtime.components[id] ?? undefined
);

export function getComponentState<T extends {}>(state: State, id: string): T {
  const component = getComponent(state, id);
  const spec = getSpec(state, component?.spec as string);
  if (component == null || spec == null) return {} as T;
  const props: Record<string, ComponentProperty> = component.properties;
  const values = forEachObject(spec.properties, ([propName, propSpec]) => (
    [propName, props[propName].current ?? props[propName].error ?? propSpec.default]
  ));
  return values as T;
}
