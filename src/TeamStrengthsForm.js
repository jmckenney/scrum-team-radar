import { html, LitElement, css } from 'lit-element';
import 'emoji-slider';

export default class TeamStrengthsForm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      form {
        width: 90%;
        padding: 5%;
        background-color: white;
      }

      label {
        width: 100%;
      }

      input {
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.josh = '';
  }

  _onSubmit() {
    const objToEmit = {};
    const formData = new FormData(this.shadowRoot.querySelector('form'));
    const formDataEntries = formData.entries();
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of formDataEntries) {
      const [prop, value] = pair;
      objToEmit[prop] = value;
    }
    this.dispatchEvent(new CustomEvent('new-player', { detail: objToEmit }));
  }

  render() {
    return html`
      <form>
        <label for="memberName">${this.josh}Member Name</label>
        <input name="memberName" id="memberName" type="text" required value="yo" />

        <label for="one">One</label>
        <input name="one" id="one" type="text" required value="5" />

        <label for="two">Two</label>
        <input name="two" id="two" type="text" required value="5" />

        <label for="three">Three</label>
        <input name="three" id="three" type="text" required value="5" />

        <label for="four">Four</label>
        <input name="four" id="four" type="text" required value="5" />

        <label for="five">Five</label>
        <input name="five" id="five" type="text" required value="5" />

        <label for="six">Six</label>
        <input name="six" id="six" type="text" required value="5" />

        <input type="button" @click="${this._onSubmit}" value="Click Me" />

        <emoji-slider emoji="😍"></emoji-slider>
      </form>
    `;
  }
}
