import { SpecsState, Spec } from './types';

type State = { runtime: { specs: SpecsState } };

// eslint-disable-next-line import/prefer-default-export
export const getSpec = (state: State, name: string): Spec | undefined => (
  state.runtime.specs[name] ?? undefined
);
