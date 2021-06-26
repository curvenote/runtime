import { DEFAULT_FORMAT } from '../../constants';
import { PropTypes } from '../types';
import { getSpecFromDefinition } from './utils';

const valueOnly = { value: true, func: false };

const VariableSpec = getSpecFromDefinition({
  name: 'var',
  description: 'Ink variable declaration',
  properties: {
    name: {
      type: PropTypes.string,
      default: '',
      has: valueOnly,
      description:
        'The variable name in the runtime state, must follow javascript naming conventions for variables',
    },
    description: {
      type: PropTypes.string,
      default: '',
      has: valueOnly,
      description: 'The variable description, useful for alt-text',
    },
    value: {
      type: PropTypes.number,
      default: 0,
      description: 'Value of the variable',
    },
    format: {
      type: PropTypes.string,
      default: DEFAULT_FORMAT,
      has: valueOnly,
      description: 'A d3-format string. See the [documentation](https://github.com/d3/d3-format).',
    },
    type: {
      type: PropTypes.string,
      default: PropTypes.number,
      has: valueOnly,
      description: 'Type of the variable, one of ["Number", String", "Boolean", "Array", "Object"]',
    },
  },
  events: {},
});

export default VariableSpec;
