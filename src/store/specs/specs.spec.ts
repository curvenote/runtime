import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import * as actions from './actions';
import { PropTypes } from '../variables/types';
import { getSpec } from './selectors';
import { Spec } from './types';

const store = createStore(
  combineReducers({ ink: combineReducers({ specs: reducer }) }),
  applyMiddleware(
    thunkMiddleware,
  ),
);

const rangeProps = {
  value: { type: PropTypes.number, default: 0 },
  min: { type: PropTypes.number, default: 0 },
  max: { type: PropTypes.number, default: 100 },
};
const rangeEvents = {
  change: { args: ['value'] },
};

describe('Specs reducer', () => {
  it('should create component specs', () => {
    const range = store.dispatch(actions.createSpec(
      'range',
      rangeProps,
      rangeEvents,
    ) as any) as Spec;

    const rangeState = getSpec(store.getState(), 'range');
    expect(rangeState).toBeTruthy();
    expect(range.properties.min.name).toBe('min');
    expect(range.properties.min.has.func).toBe(true);
    expect(range.properties.min.default).toBe(0);
    expect(range.properties.something).toBeUndefined();
  });
  it('should create component specs from object', () => {
    const range = store.dispatch(actions.createSpec({
      name: 'range2',
      properties: rangeProps,
      events: rangeEvents,
    }) as any) as Spec;

    const rangeState = getSpec(store.getState(), 'range2');
    expect(rangeState).toBeTruthy();
    expect(range.properties.min.name).toBe('min');
    expect(range.properties.min.has.func).toBe(true);
    expect(range.properties.min.default).toBe(0);
    expect(range.properties.something).toBeUndefined();
  });
});
