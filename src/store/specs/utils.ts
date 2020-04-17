import {
  DefineComponentSpec, ComponentSpec, ComponentPropertySpec, ComponentEventSpec,
} from './types';
import { forEachObject } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export function getSpecFromDefinition(specDefinition: DefineComponentSpec): ComponentSpec {
  const spec: ComponentSpec = {
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
        } as ComponentPropertySpec,
      ],
    ),
    events: forEachObject(
      specDefinition.events,
      ([name, evt]) => [
        name,
        {
          name,
          args: evt.args ?? [],
        } as ComponentEventSpec],
    ),
  };
  return spec;
}
