import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import runtime, { types, actions } from '.';
import reducer from './store/reducers';
import { PropTypes } from './store/types';

const rangeProps = {
  value: { type: PropTypes.number, default: 0 },
  min: { type: PropTypes.number, default: 0 },
  max: { type: PropTypes.number, default: 100 },
  transform: { type: PropTypes.number, default: 100, args: ['value'] },
};
const rangeEvents = {
  change: { args: ['value'] },
};

const store = createStore(
  combineReducers({ runtime: reducer }),
  applyMiddleware(thunkMiddleware, runtime.triggerEvaluate, runtime.dangerousEvaluatation),
) as types.Store;

store.dispatch(actions.createSpec('range', rangeProps, rangeEvents));

describe('integration', () => {
  it('should evaluate the variable', () => {
    const x = store.dispatch(actions.createVariable('scope.x', 3));
    const max = store.dispatch(actions.createVariable('scope.max', 9));
    const otherMax = store.dispatch(actions.createVariable('scope.max2', 8));
    const range = store.dispatch(
      actions.createComponent(
        'range',
        { value: { func: 'x' }, min: { value: 1 }, max },
        { change: { func: '{x: value}' } },
        { scope: 'scope' },
      ),
    );

    expect(range.component?.properties.value.func).toBe('x');
    // You can set through the variable shortcut, which sets to a function
    expect(range.component?.properties.max.func).toBe('max');
    expect(range.state?.min).toBe(1);
    expect(x.get()).toBe(3);
    expect(range.state?.value).toBe(3);
    expect(range.state?.max).toBe(9);
    // Change through event
    range.dispatchEvent('change', [5]);
    expect(range.state?.min).toBe(1);
    expect(x.get()).toBe(5);
    expect(range.state?.value).toBe(5);
    expect(range.state?.max).toBe(9);
    // Change through setting the variable
    x.set(4);
    expect(range.state?.min).toBe(1);
    expect(x.get()).toBe(4);
    expect(range.state?.value).toBe(4);
    expect(range.state?.max).toBe(9);

    // Setting things to something else:
    range.set({ max: otherMax });
    expect(range.state?.min).toBe(1);
    expect(x.get()).toBe(4);
    expect(range.state?.value).toBe(4);
    expect(range.state?.max).toBe(8);

    // Ensure that noops do not trigger a state change
    const store1 = store.getState();
    const state1 = range.component;
    max.set(9);
    otherMax.set(8);
    range.set({ value: { func: 'x' }, max: otherMax }, { change: { func: '{x: value}' } });
    const store2 = store.getState();
    const state2 = range.component;
    expect(state1).toEqual(state2);
    expect(state1 === state2).toBe(true);
    expect(store1.runtime.variables === store2.runtime.variables).toBe(true);
    expect(store1.runtime.components === store2.runtime.components).toBe(true);
    range.set({ value: { func: 'x + 1' } });
    const state3 = range.component;
    // Just to be sure it isn't giving back the same thing!
    expect(state1 === state3).toBe(false);

    // Remove it!
    range.remove();
    expect(x.get()).toBe(4);
    expect(range.state).toEqual({});
  });

  it('should work with transforms', () => {
    const x = store.dispatch(actions.createVariable('test2.x', 3));
    const range = store.dispatch(
      actions.createComponent(
        'range',
        {
          value: { func: 'x' },
          transform: { func: 'value == 0 ? "free" : value' },
        },
        { change: { func: '{x: value}' } },
        { scope: 'test2' },
      ),
    );
    expect(range.state?.transform).toBe(x.get());
    x.set(0);
    expect(range.state?.transform).toBe('free');
  });
});
