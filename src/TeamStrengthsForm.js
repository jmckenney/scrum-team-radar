import { html, LitElement } from 'lit-element';
import 'emoji-slider';

export default class TeamStrengthsForm extends LitElement {
  render() {
    return html`
        <style>
        </style>
        <div>
            <slot></slot>
        </div>
    `;
  }
}
