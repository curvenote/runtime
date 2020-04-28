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
          attribute: prop.attribute ?? name,
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
          attribute: evt.attribute ?? name,
        } as SpecEvent],
    ),
  };
  Object.entries(spec.properties).forEach(([name, prop]) => {
    if (prop.args.length === 0) return;
    prop.args.forEach((arg) => {
      if (arg in spec.properties) return;
      throw new Error(`Property spec: "${name}" has unrecognized argument: "${arg}". It must be a property of the spec.`);
    });
  });
  return spec;
}
