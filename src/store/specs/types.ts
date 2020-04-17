import { VariableTypes, PropTypes } from '../variables/types';

export const DEFINE_SPEC = 'DEFINE_SPEC';

export interface ComponentPropertySpec {
  name: string;
  description?: string;
  type: PropTypes;
  default: VariableTypes;
  args: string[];
  has: {
    value: boolean;
    func: boolean;
  };
}

export interface ComponentEventSpec {
  name: string;
  args: string[];
}

// type, default are required, name not included, all other optional
export type DefineComponentPropertySpec = Partial<Omit<ComponentPropertySpec, 'name' | 'type' | 'default'>> &
Required<Pick<ComponentPropertySpec, 'type' | 'default'>>;
// name not included
export type DefineComponentEventSpec = Omit<ComponentEventSpec, 'name'>;

export interface ComponentSpec{
  name: string;
  description: string;
  properties: Record<string, ComponentPropertySpec>;
  events: Record<string, ComponentEventSpec>;
}

export type SpecsState = Record<string, ComponentSpec>;

export interface CreateSpecAction {
  type: typeof DEFINE_SPEC;
  payload: ComponentSpec;
}

export type SpecActionTypes = (
  CreateSpecAction
);

export interface DefineComponentSpec{
  name: string;
  properties: Record<string, DefineComponentPropertySpec>;
  events: Record<string, DefineComponentEventSpec>;
  description?: string;
}
