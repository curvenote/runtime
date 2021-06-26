import { CommunicationActionTypes, EvaluationError } from '../comms/types';

export const DEFINE_VARIABLE = 'DEFINE_VARIABLE';
export const REMOVE_VARIABLE = 'REMOVE_VARIABLE';

export enum PropTypes {
  number = 'Number',
  string = 'String',
  boolean = 'Boolean',
  array = 'Array',
  object = 'Object',
}

export type VariableTypes = string | number | boolean | object | null;

export interface DefineVariable {
  id: string;
  type: PropTypes;
  scope: string;
  name: string;
  description: string;
  format: string;
  value: VariableTypes;
  func: string;
}

export interface CurrentValue {
  derived: boolean;
  current: VariableTypes;
  error?: EvaluationError;
}

export type Variable = DefineVariable & CurrentValue;

export type VariablesState = {
  [index: string]: Variable;
};

export interface CreateVariable {
  type: typeof DEFINE_VARIABLE;
  payload: DefineVariable;
}

export interface RemoveVariable {
  type: typeof REMOVE_VARIABLE;
  payload: {
    id: string;
  };
}

export type VariablesActionTypes = CreateVariable | RemoveVariable | CommunicationActionTypes;

// For the actions
export type CreateVariableOptions = {
  description: string;
  type: PropTypes;
  format: string;
};
export interface UpdateVariableOptions extends CreateVariableOptions {
  scope: string;
  name: string;
}
