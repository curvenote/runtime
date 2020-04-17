import {
  SpecsState, ComponentSpec,
} from './types';

type State = { ink: { specs: SpecsState } };

// eslint-disable-next-line import/prefer-default-export
export const getSpec = (state: State, name: string): ComponentSpec | undefined => (
  state.ink.specs[name] ?? undefined
);
