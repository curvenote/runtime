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

const properties = {
  value: { type: PropTypes.number, default: 0 },
  min: { type: PropTypes.number, default: 0 },
  max: { type: PropTypes.number, default: 100 },
  transform: { type: PropTypes.number, default: 100, args: ['value'] },
};
const events = {
  change: { args: ['value'] },
};

describe('Specs reducer', () => {
  it('should create component specs', () => {
    const test1 = store.dispatch(actions.createSpec(
      'test1',
      properties,
      events,
    ) as any) as Spec;

    const test1State = getSpec(store.getState(), 'test1');
    expect(test1State).toBeTruthy();
    expect(test1.properties.min.name).toBe('min');
    expect(test1.properties.min.has.func).toBe(true);
    expect(test1.properties.min.default).toBe(0);
    expect(test1.properties.something).toBeUndefined();
  });
  it('should create component specs from object', () => {
    const test2 = store.dispatch(actions.createSpec({
      name: 'test2',
      properties,
      events,
    }) as any) as Spec;

    const test2State = getSpec(store.getState(), 'test2');
    expect(test2State).toBeTruthy();
    expect(test2.properties.min.name).toBe('min');
    expect(test2.properties.min.has.func).toBe(true);
    expect(test2.properties.min.default).toBe(0);
    expect(test2.properties.something).toBeUndefined();
  });
  it('should error with bad args that are not properties', () => {
    const badSpec = {
      name: 'test3',
      properties: {
        ...properties,
        transform: { type: PropTypes.number, default: 100, args: ['bad'] },
      },
      events,
    };
    expect(() => store.dispatch(actions.createSpec(badSpec) as any)).toThrow();
  });
});
