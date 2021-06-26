import { VariableTypes, PropTypes } from '../variables/types';

export const DEFINE_SPEC = 'DEFINE_SPEC';

export interface SpecProperty {
  name: string;
  description?: string;
  type: PropTypes;
  default: VariableTypes;
  args: string[];
  attribute: string;
  has: {
    value: boolean;
    func: boolean;
  };
}

export interface SpecEvent {
  name: string;
  args: string[];
  attribute: string;
}

// type, default are required, name not included, all other optional
export type DefineSpecProperty = Partial<Omit<SpecProperty, 'name' | 'type' | 'default'>> &
  Required<Pick<SpecProperty, 'type' | 'default'>>;
// name not included, args required
export type DefineSpecEvent = Partial<Omit<SpecEvent, 'name' | 'args'>> &
  Required<Pick<SpecProperty, 'args'>>;

export interface DefineSpec {
  name: string;
  properties: Record<string, DefineSpecProperty>;
  events: Record<string, DefineSpecEvent>;
  description?: string;
}

export interface Spec {
  name: string;
  description: string;
  properties: Record<string, SpecProperty>;
  events: Record<string, SpecEvent>;
}

export type SpecsState = Record<string, Spec>;

export interface CreateSpecAction {
  type: typeof DEFINE_SPEC;
  payload: Spec;
}

export type SpecActionTypes = CreateSpecAction;
