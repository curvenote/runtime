import reducer from './reducers';
import * as actions from './actions';
import { PropTypes } from './types';

const initialState = {};

describe('Variables reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should create a variable', () => {
    expect(
      reducer(
        initialState,
        actions.defineVariable({
          id: 'RANDOM-ID',
          scope: 'myScope',
          name: 'myVar',
          description: '',
          type: PropTypes.number,
          value: 42,
          func: '',
          format: '.2f',
        }),
      ),
    ).toEqual({
      'RANDOM-ID': {
        id: 'RANDOM-ID',
        current: 42,
        derived: false,
        description: '',
        format: '.2f',
        scope: 'myScope',
        name: 'myVar',
        type: 'Number',
        value: 42,
        func: '',
      },
    });
  });

  it('should not evaluate the variable', () => {
    expect(
      reducer(
        initialState,
        actions.defineVariable({
          id: 'RANDOM-ID',
          scope: 'myScope',
          name: 'myVar',
          description: '',
          type: PropTypes.number,
          value: null,
          func: '1 + 1',
          format: '.2f',
        }),
      ),
    ).toEqual({
      'RANDOM-ID': {
        id: 'RANDOM-ID',
        current: null,
        derived: true,
        description: '',
        format: '.2f',
        scope: 'myScope',
        name: 'myVar',
        type: 'Number',
        value: null,
        func: '1 + 1',
      },
    });
  });
});
