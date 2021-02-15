import {
  VariableTypes, CurrentValue,
} from '../variables/types';
import { CommunicationActionTypes } from '../comms/types';
import { Spec } from '../specs/types';

export const DEFINE_COMPONENT = 'DEFINE_COMPONENT';
export const REMOVE_COMPONENT = 'REMOVE_COMPONENT';
export const COMPONENT_EVENT = 'COMPONENT_EVENT';

export interface DefineComponentProperty<T = VariableTypes> {
  name: string;
  value: T;
  func: string;
}

export type ComponentProperty = DefineComponentProperty & CurrentValue;

export interface ComponentEvent {
  name: string;
  func: string;
}

export interface Component {
  spec: string;
  id: string;
  scope: string;
  name: string | null;
  description: string;
  properties: Record<string, ComponentProperty>;
  events: Record<string, ComponentEvent>;
}
export type DefineComponent = Omit<Component, 'properties'> & { properties: Record<string, DefineComponentProperty> };

export type ComponentsState = Record<string, Component>;

export interface ComponentEventAction {
  type: typeof COMPONENT_EVENT;
  payload: {
    id: string;
    component: string;
    name: string;
    values: VariableTypes[];
  };
}

export interface CreateComponentAction {
  type: typeof DEFINE_COMPONENT;
  payload: {
    spec: Spec;
    component: DefineComponent;
  };
}

export interface RemoveComponentAction {
  type: typeof REMOVE_COMPONENT;
  payload: { id: string };
}

export type ComponentActionTypes = (
  CreateComponentAction |
  RemoveComponentAction |
  ComponentEventAction |
  CommunicationActionTypes
);

export interface CreateComponentOptionDefaults{
  scope: string;
  name: string | null;
  description: string;
}
export interface UpdateComponentOptionDefaults extends CreateComponentOptionDefaults {
  scope: string;
  name: string | null;
}

export type PartialProps<K = VariableTypes> = Partial<Omit<DefineComponentProperty<K>, 'name'>>;
