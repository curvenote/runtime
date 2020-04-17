import {
  Store as RStore,
  Middleware as RMiddleware,
  Reducer as RReducer,
  Action,
} from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { VariablesState, VariablesActionTypes } from './variables/types';
import { ComponentsState, ComponentActionTypes } from './components/types';
import { SpecsState, SpecActionTypes } from './specs/types';
import { CommunicationActionTypes } from './comms/types';

export * from './variables/types';
export * from './specs/types';
export * from './components/types';
export * from './comms/types';
export * from './shortcuts';

export interface State {
  ink: {
    specs: SpecsState;
    variables: VariablesState;
    components: ComponentsState;
  }
}

export type Actions = (
  VariablesActionTypes |
  ComponentActionTypes |
  SpecActionTypes |
  CommunicationActionTypes
);

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, null, Action<Actions['type']>>;
export type Dispatch = ThunkDispatch<State, null, Action<Actions['type']>>;
export type Store = RStore<State, Actions> & { dispatch: Dispatch; };
export type Middleware = RMiddleware<{}, State, Dispatch>;
export type Reducer = RReducer<State, Actions>;
