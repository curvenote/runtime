import '@material/mwc-switch';
import { html, PropertyValues } from 'lit-element';
import { types } from '@iooxa/ink-store';
import { BaseComponent, withInk, onBindChange } from './base';
import { HTMLElementEvent } from '../types';

export const InkSwitchSpec = {
  name: 'switch',
  description: 'Inline text that drags a value inside a range',
  properties: {
    value: { type: types.PropTypes.boolean, default: false },
  },
  events: {
    change: { args: ['value'] },
  },
};

@withInk(InkSwitchSpec, { bind: { type: String, reflect: true } })
class InkSwitch extends BaseComponent<typeof InkSwitchSpec> {
  updated(updated: PropertyValues) { onBindChange(updated, this, 'change'); }

  render() {
    const { value } = this.ink!.state;
    const change = (evt: HTMLElementEvent<HTMLInputElement>) => { this.ink?.dispatchEvent('change', [evt.target.checked]); };
    return html`<mwc-switch ?checked=${value} @change=${change}></mwc-switch>`;
  }
}

export default InkSwitch;