import {
  DefineSpec, Spec, SpecProperty, SpecEvent,
} from './types';
import { forEachObject } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export function getSpecFromDefinition(specDefinition: DefineSpec): Spec {
  const spec: Spec = {
    description: 'No description',
    ...specDefinition,
    properties: forEachObject(
      specDefinition.properties,
      ([name, prop]) => [
        name,
        {
          name,
          type: prop.type,
          default: prop.default,
          description: prop.description ?? '',
          args: prop.args ?? [],
          has: prop.has ?? { value: true, func: true },
        } as SpecProperty,
      ],
    ),
    events: forEachObject(
      specDefinition.events,
      ([name, evt]) => [
        name,
        {
          name,
          args: evt.args ?? [],
        } as SpecEvent],
    ),
  };
  return spec;
}
