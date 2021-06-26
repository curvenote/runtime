import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import specReducer from '../specs/reducers';
import reducer from './reducers';
import * as specActions from '../specs/actions';
import * as actions from './actions';
import { PropTypes } from '../variables/types';
import { DEFAULT_SCOPE } from '../../constants';
import { ComponentShortcut } from '../shortcuts';

const store = createStore(
  combineReducers({ runtime: combineReducers({ components: reducer, specs: specReducer }) }),
  applyMiddleware(thunkMiddleware),
);

const rangeProps = {
  value: { type: PropTypes.number, default: 0 },
  min: { type: PropTypes.number, default: 0 },
  max: { type: PropTypes.number, default: 100 },
};
const rangeEvents = {
  change: { args: ['value'] },
};

store.dispatch(specActions.createSpec('range', rangeProps, rangeEvents) as any);

describe('Components reducer', () => {
  it('should create component', () => {
    const notRange = actions.createComponent('notRange', {}, {});
    expect(() => store.dispatch(notRange as any)).toThrow();
    const badRange = actions.createComponent('range', { blah: { value: 2 } }, {});
    expect(() => store.dispatch(badRange as any)).toThrow();
    // The null max should likely throw?
    // TODO: The scope should be set rather than the var name.
    const range = store.dispatch(
      actions.createComponent('range', { min: { value: 2 }, max: { value: null } }) as any,
    ) as ComponentShortcut<Record<keyof typeof rangeProps, number>>;

    expect(range.scope).toBe(DEFAULT_SCOPE);
    expect(range.name).toBeNull();
    expect(range.state?.min).toBe(2);
    expect(range.state?.max).toBe(100);

    range.set({}, {}, { name: 'hi' });
    expect(range.name).toBe('hi');
  });
});
