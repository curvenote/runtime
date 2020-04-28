import isEqual from 'lodash.isequal';

import { Component } from './types';
import { compareDefine as compareProperty } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export function compareComponentDefine(prev: Component, next: Component) {
  const one = { ...prev };
  const two = { ...next };
  delete one.properties;
  delete two.properties;
  delete one.events;
  delete two.events;
  if (!isEqual(one, two)) return false;
  const allSame = { current: true };
  Object.entries(prev.properties).forEach(([key, prevProp]) => {
    if (!allSame.current) return;
    allSame.current = compareProperty(prevProp, next.properties[key]);
  });
  if (!allSame.current) return false;
  Object.entries(prev.events).forEach(([key, prevEvt]) => {
    if (!allSame.current) return;
    allSame.current = isEqual(prevEvt, next.events[key]);
  });
  return allSame.current;
}
