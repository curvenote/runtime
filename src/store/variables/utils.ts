import { DEFAULT_SCOPE } from '../../constants';
import { VariableTypes, PropTypes, CurrentValue } from './types';
import { ValueOrError } from '../comms/types';

export function convertValue(value: VariableTypes, type: PropTypes): VariableTypes {
  switch (type) {
    case PropTypes.boolean:
      // eslint-disable-next-line no-nested-ternary
      return value === 'true' ? true : value === 'false' ? false : Boolean(value);
    case PropTypes.number:
      return Number(value);
    case PropTypes.string:
      return value;
    case PropTypes.array:
    case PropTypes.object:
      if (typeof value !== 'string') return value;
      try {
        return JSON.parse(value as string);
      } catch (error) {
        return value;
      }
    default:
      return value;
  }
}

export function includeCurrentValue<
  T extends {
    value: VariableTypes;
    func: string;
  },
>(obj: T, type: PropTypes, current?: VariableTypes): T & CurrentValue {
  const derived = obj.func !== '';
  return {
    ...obj,
    derived,
    value: derived ? null : convertValue(obj.value, type),
    current: derived ? null : convertValue(current ?? obj.value, type),
  };
}

export function unpackCurrent<T>(state: T, current: ValueOrError): T {
  // TODO: Check the type of the return value.
  if (current == null) return { ...state };
  if (current.error) return { ...state, current: null, error: { ...current.error } };
  return { ...state, current: current.value ?? null, error: undefined };
}

export function getScopeAndName(
  scopeAndName: string,
  defaultScope: string = DEFAULT_SCOPE,
): { scope: string; name: string } {
  const split = scopeAndName.split('.');
  if (split.length === 1) {
    return { scope: defaultScope, name: split[0] };
  }
  if (split.length !== 2) throw new Error('name is malformed');
  return { scope: split[0], name: split[1] };
}

export function testScopeAndName(scope: string, name: string | null, allowNull = false): boolean {
  // Simple variable names only ....
  const regex = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
  const testName = allowNull ? name == null || regex.test(name) : name != null && regex.test(name);
  return regex.test(scope) && testName;
}
