import {
  ComponentsState,
  ComponentActionTypes,
  DefineComponentProperty, ComponentProperty,
  DEFINE_COMPONENT, REMOVE_COMPONENT,
} from './types';
import { Spec } from '../specs/types';
import { RETURN_RESULTS } from '../comms/types';
import { forEachObject, compareEval } from '../utils';
import { includeCurrentValue, testScopeAndName, unpackCurrent } from '../variables/utils';
import { compareComponentDefine } from './utils';

const initialState: ComponentsState = {};

const includeCurrentValueInProps = (
  props: Record<string, DefineComponentProperty>,
  spec: Spec,
): Record<string, ComponentProperty> => (
  forEachObject(spec.properties, ([propName, propSpec]) => {
    const prop = {
      ...props[propName],
    };
    return [
      propName,
      { ...includeCurrentValue(prop, propSpec.type) },
    ];
  })
);


const componentsReducer = (
  state: ComponentsState = initialState,
  action: ComponentActionTypes,
): ComponentsState => {
  switch (action.type) {
    case DEFINE_COMPONENT: {
      const { component: newComponent, spec } = action.payload;
      const { scope, name } = newComponent;
      if (!testScopeAndName(scope, name)) throw new Error('Scope or name has bad characters');
      const component = {
        ...newComponent,
        properties: includeCurrentValueInProps(newComponent.properties, spec),
      };
      const prev = state[component.id];
      if (compareComponentDefine(component, prev)) return state;
      return {
        ...state,
        [component.id]: component,
      };
    }
    case REMOVE_COMPONENT: {
      const { id } = action.payload;
      if (state[id] == null) return state;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }
    case RETURN_RESULTS: {
      const newState = { ...state };
      const oneChange = { current: false };
      Object.entries(action.payload.results.components).forEach(([id, properties]) => {
        if (newState[id] == null) return;
        Object.entries(properties).forEach(([propName, value]) => {
          if (newState[id].properties[propName] == null) return;
          const prev = newState[id].properties[propName];
          const next = unpackCurrent(prev, value);
          if (compareEval(prev, next)) return;
          newState[id] = {
            ...newState[id],
            properties: {
              ...newState[id].properties,
              [propName]: next,
            },
          };
          oneChange.current = true;
        });
      });
      if (!oneChange.current) return state;
      return newState;
    }
    default:
      return state;
  }
};

export default componentsReducer;
